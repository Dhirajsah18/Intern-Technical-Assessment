import { useRef, useState } from "react";
import api from "../utils/api.js";

export default function UploadCard({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max size is 5 MB");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file)); // 👈 PREVIEW
  };

  const toDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleUpload = async () => {
    if (!file || uploading) return;

    try {
      setUploading(true);
      const dataUrl = await toDataURL(file);

      const res = await api.post("/images/upload", {
        image: dataUrl,
      });

      setFile(null);
      setPreview(null);

      // 🔥 instant dashboard update
      await onSuccess(res?.data?.image);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Upload Artwork
        </h2>
        <p className="text-slate-500">
          Share your creativity with the community
        </p>
      </div>

      {/* File picker */}
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-indigo-300 rounded-xl px-6 py-5 cursor-pointer hover:bg-indigo-50 transition"
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => handleSelect(e.target.files[0])}
        />

        <div className="flex items-center gap-4">
          <span className="px-4 py-2.5 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 
                        hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200">
            Choose File
          </span>

          <span className="text-slate-600 text-sm truncate">
            {file ? file.name : "No file chosen"}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Supported formats: JPG, PNG · Max 5 MB
        </p>
      </div>

      {/* 🔥 IMAGE PREVIEW */}
      {preview && (
        <div className="mt-6">
          <img
              src={preview}
              alt="preview"
              className="max-h-60 rounded-xl border shadow"
              />
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-6 w-full py-3 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 
                        hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
      >
        {uploading ? "Uploading..." : "Upload Artwork"}
      </button>
    </div>
  );
}
