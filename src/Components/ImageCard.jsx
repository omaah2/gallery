
import React from "react";

function ImageCard({ image }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover transition-opacity hover:opacity-80"
        />
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2">{image.title}</div>
        <div className="flex flex-wrap gap-2">
          {image.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
