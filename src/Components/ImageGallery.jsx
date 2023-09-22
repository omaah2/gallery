/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import LoadingPage from "./LoadingPage";

const images = [
  {
    id: "image1",
    url: "https://images.pexels.com/photos/165537/pexels-photo-165537.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Nature ",
    tags: ["nature", "tree"],
  },
  {
    id: "image2",
    url: "https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Landscape ",
    tags: ["landscape", "mountain"],
  },
  {
    id: "image3",
    url: "https://images.pexels.com/photos/4058529/pexels-photo-4058529.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Spring Flowers",
    tags: ["Flowers", "nature"],
  },
  {
    id: "image4",
    url: "https://images.pexels.com/photos/6354470/pexels-photo-6354470.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Winter Landscape",
    tags: ["winter", "nature"],
  },
  {
    id: "image5",
    url: "https://images.pexels.com/photos/464327/pexels-photo-464327.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Waterfall",
    tags: ["nature", "water-fall"],
  },
  {
    id: "image6",
    url: "https://images.pexels.com/photos/239107/pexels-photo-239107.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Night Sky",
    tags: ["sky", "night", "nature"],
  },
  {
    id: "image7",
    url: "https://images.pexels.com/photos/2109800/pexels-photo-2109800.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Ocean Fish",
    tags: ["ocean", "fish", "nature"],
  },
  {
    id: "image8",
    url: "https://images.pexels.com/photos/1007227/pexels-photo-1007227.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Birds",
    tags: ["nature", "birds"],
  },
  {
    id: "image9",
    url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Nature Beauty",
    tags: ["nature", "beauty"],
  },
  {
    id: "image10",
    url: "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Plant",
    tags: ["nature", "plant"],
  },
  {
    id: "image11",
    url: "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Thunderl",
    tags: ["Sky", "Weather"],
  },
  {
    id: "image12",
    url: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "River",
    tags: ["Beauty", "water", "nature"],
  },
  {
    id: "image13",
    url: "https://images.pexels.com/photos/689784/pexels-photo-689784.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Birds",
    tags: ["Land", "Bird", "nature"],
  },
  {
    id: "image14",
    url: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Flower",
    tags: ["nature", "beauty"],
  },
  {
    id: "image15",
    url: "https://images.pexels.com/photos/4374580/pexels-photo-4374580.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "picnic",
    tags: ["nature", "beauty"],
  },
  {
    id: "image16",
    url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "water",
    tags: ["nature", "water"],
  },
];

function ImageGallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [draggedImage, setDraggedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState(images);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = images.filter((image) =>
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredImages(filtered);
  };

  const handleDragStart = (image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (!draggedImage) return;

    const draggedImageIndex = galleryImages.findIndex(
      (image) => image.id === draggedImage.id
    );

    if (draggedImageIndex !== -1) {
      const newGalleryImages = [...galleryImages];
      newGalleryImages.splice(draggedImageIndex, 1);
      newGalleryImages.splice(dropIndex, 0, draggedImage);
      setGalleryImages(newGalleryImages);
    }

    setDraggedImage(null);
  };

  return (
    <div className="mt-56 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by tags"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md focus:outline-none h-10"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r-md focus:outline-none h-10"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchTerm
          ? filteredImages.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(image)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <ImageCard image={image} />
              </div>
            ))
          : galleryImages.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(image)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <ImageCard image={image} />
              </div>
            ))}
        {draggedImage && (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <img
                src={draggedImage.url}
                alt={draggedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 py-4 bg-white">
              <div className="font-bold text-xl mb-2">{draggedImage.title}</div>
              <div className="flex flex-wrap gap-2">
                {draggedImage.tags.map((tag) => (
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
        )}
      </div>
    </div>
  );
}

export default ImageGallery;
