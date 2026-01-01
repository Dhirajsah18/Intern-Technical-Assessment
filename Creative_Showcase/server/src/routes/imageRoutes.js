import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  uploadImage,
  deleteImage,
  getRandomImages,
  getImagesByUsername,
  getMyImages, 
} from "../controllers/imageController.js";

const router = express.Router();

// public routes
router.get("/random", getRandomImages);
router.get("/user/:username", getImagesByUsername);

// private routes
router.get("/my", authMiddleware, getMyImages); // ✅ FIX
router.post("/upload", authMiddleware, uploadImage);
router.delete("/:id", authMiddleware, deleteImage);

export default router;
