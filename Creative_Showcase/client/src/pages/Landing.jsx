import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Navbar from "../components/Navbar";
import GalleryGrid from "../components/GalleryGrid";
import api from "../utils/api";

export default function Landing() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/images/random")
      .then((res) => setImages(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <Navbar showAuth />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Discover Amazing{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Creativity
          </span>
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Explore stunning visual content shared by creators around the world.
        </p>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <p className="text-center text-slate-600">Loading creativity...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-600">No images found.</p>
        ) : (
          <GalleryGrid images={images} showProfile />
        )}
      </section>
    </MainLayout>
  );
}
