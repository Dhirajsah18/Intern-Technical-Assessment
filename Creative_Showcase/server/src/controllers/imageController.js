import Image from "../models/Image.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// GET RANDOM IMAGES

export const getRandomImages = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;

    const images = await Image.aggregate([
      { $sample: { size: limit } }
    ]);

    const populated = await Image.populate(images, {
      path: "user",
      select: "username",
    });

    const result = populated.map(img => ({
      ...img,
      username: img.user?.username,
    }));

    res.json(result);
  } catch (err) {
    console.error("getRandomImages error:", err);
    res.status(500).json({ message: "Failed to load images" });
  }
};

// GET IMAGES BY USERNAME

export const getImagesByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const images = await Image.find({ user: user._id }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user images" });
  }
};

// GET MY IMAGES

export const getMyImages = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const images = await Image.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load your images" });
  }
};

// UPLOAD IMAGE

export const uploadImage = async (req, res) => {
  try {
    const { image, mime } = req.body; // base64 image or raw base64 + mime

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.userId).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Accept either data URL or raw base64; reconstruct if needed
    let dataUrl = image;
    const isDataUrl = /^data:/i.test(image);
    if (!isDataUrl) {
      const fallbackMime = (mime || "image/jpeg").toLowerCase();
      dataUrl = `data:${fallbackMime};base64,${image}`;
    }

    // Validate allowed formats (png, jpg, jpeg)
    const allowed = /^data:image\/(png|jpe?g);base64,/i.test(dataUrl);
    if (!allowed) {
      return res.status(400).json({ message: "Unsupported image format. Use PNG or JPG/JPEG." });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUrl, {
      folder: "creative-showcase",
      resource_type: "image",
    });

    const newImage = await Image.create({
      user: req.userId,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    res.status(201).json(newImage);
  } catch (err) {
    console.error("Upload error:", err);
    const message = err?.http_code === 413 || /File size/i.test(err?.message || "")
      ? "Image too large. Try a smaller file."
      : err?.message || "Upload failed";
    res.status(500).json({ message });
  }
};

// DELETE IMAGE

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res
      .status(404)
      .json({ message: "Image not found" });
    }

    if (image.user.toString() !== req.userId) {
      return res
      .status(403)
      .json({ message: "Not authorized" });
    }

    // delete from Cloudinary if publicId exists
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    } else {
      console.warn("No publicId found, skipping Cloudinary delete");
    }

    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

