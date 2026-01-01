import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import GalleryGrid from "../components/GalleryGrid";
import { getUserImages } from "../services/imageService";

export default function UserProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getUserImages(username).then(setImages);
  }, [username]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">@{username}</h1>
      <GalleryGrid images={images} />
    </MainLayout>
  );
}
