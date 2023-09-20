import React from "react";

function ImageCard({ image }) {
  return (
    <div className="border p-4">
      <img src={image.url} alt={image.id} className="max-w-full" />
      <div className="mt-2">
        {image.tags.map((tag) => (
          <span key={tag} className="mr-2 bg-gray-300 p-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageCard;
