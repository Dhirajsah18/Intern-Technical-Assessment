import { Link } from "react-router-dom";

export default function GalleryGrid({
  images,
  showProfile = false,
  onDelete, // 👈 optional
}) {
  return (
    <div className="masonry">
      {images.map((img) => (
        <div
          key={img._id}
          className="mb-4 relative group overflow-hidden rounded-2xl
                     bg-white border border-indigo-200 shadow-md
                     hover:shadow-2xl transition"
        >
          <img
            src={img.imageUrl}
            alt="creative"
            loading="lazy"
            className="w-full group-hover:scale-105 transition-transform"
          />

          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/30 opacity-0
                       group-hover:opacity-100 transition"
          />

          {/* DELETE button (Dashboard only) */}
          {onDelete && (
            <button
              onClick={() => onDelete(img._id)}
              className="absolute top-3 right-3 z-10
                         opacity-0 group-hover:opacity-100
                         bg-red-600 text-white text-xs
                         px-3 py-1 rounded-full
                         hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}

          {/* profile link (Public pages) */}
          {showProfile && img.username && (
            <Link
              to={`/profile/${img.username}`}
              className="absolute bottom-3 left-3 bg-black/70 text-white
                         text-xs px-3 py-1 rounded-full opacity-0
                         group-hover:opacity-100 transition"
            >
              @{img.username}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
