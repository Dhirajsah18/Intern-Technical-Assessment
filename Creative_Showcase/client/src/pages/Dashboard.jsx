import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import GalleryGrid from "../components/GalleryGrid";
import { getMyImages, deleteImage } from "../services/imageService";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await getMyImages();
      setImages(data);
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;

    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <MainLayout>
      <Navbar showLogout />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <UploadCard onSuccess={loadImages} />

        <h2 className="text-2xl font-bold text-slate-900 mt-14 mb-6">
          My Gallery
          <span className="text-slate-500 font-normal ml-2">
            ({images.length})
          </span>
        </h2>

        {loading ? (
          <p className="text-slate-600 text-center">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-slate-600 text-center">
            No images uploaded yet.
          </p>
        ) : (
          <GalleryGrid images={images} onDelete={handleDelete} />
        )}
      </div>
    </MainLayout>
  );
}
