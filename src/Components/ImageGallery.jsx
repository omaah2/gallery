import React, { useState } from "react";
import ImageCard from "./ImageCard";

const images = [
  {
    id: "image1",
    url: "https://images.pexels.com/photos/165537/pexels-photo-165537.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Nature ", // Change the image title
    tags: ["nature", "tree"],
  },
  {
    id: "image2",
    url: "https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Landscape ", // Change the image title
    tags: ["landscape", "mountain"],
  },
  {
    id: "image3",
    url: "https://images.pexels.com/photos/4058529/pexels-photo-4058529.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Spring Flowers", // Change the image title
    tags: ["Flowers", "nature"],
  },
  {
    id: "image4",
    url: "https://images.pexels.com/photos/6354470/pexels-photo-6354470.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Winter Landscape", // Change the image title
    tags: ["winter", "nature"],
  },
  {
    id: "image5",
    url: "https://images.pexels.com/photos/464327/pexels-photo-464327.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Waterfall", // Change the image title
    tags: ["nature", "water-fall"],
  },
  {
    id: "image6",
    url: "https://images.pexels.com/photos/239107/pexels-photo-239107.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Night Sky", // Change the image title
    tags: ["sky", "night", "nature"],
  },
  {
    id: "image7",
    url: "https://images.pexels.com/photos/2109800/pexels-photo-2109800.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Ocean Fish", // Change the image title
    tags: ["ocean", "fish", "nature"],
  },
  {
    id: "image8",
    url: "https://images.pexels.com/photos/1007227/pexels-photo-1007227.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Birds", // Change the image title
    tags: ["nature", "birds"],
  },
  {
    id: "image9",
    url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Nature Beauty", // Change the image title
    tags: ["nature", "beauty"],
  },
  {
    id: "image10",
    url: "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Plant", // Change the image title
    tags: ["nature", "plant"],
  },
];

function ImageGallery ()
{
  const [ draggedImage, setDraggedImage ] = useState( null );
  const [ galleryImages, setGalleryImages ] = useState( images );

  const handleDragStart = ( image ) =>
  {
    setDraggedImage( image );
  };

  const handleDragOver = ( e ) =>
  {
    e.preventDefault();
  };

  const handleDrop = ( e, dropIndex ) =>
  {
    e.preventDefault();
    if ( !draggedImage ) return;

    // Find the index of the dragged image in the galleryImages array
    const draggedImageIndex = galleryImages.findIndex(
      ( image ) => image.id === draggedImage.id
    );

    if ( draggedImageIndex !== -1 )
    {
      // Create a new array by copying the galleryImages array
      const newGalleryImages = [ ...galleryImages ];

      // Remove the dragged image from its current position
      newGalleryImages.splice( draggedImageIndex, 1 );

      // Insert the dragged image at the dropIndex position
      newGalleryImages.splice( dropIndex, 0, draggedImage );

      // Update the state with the new order of images
      setGalleryImages( newGalleryImages );
    }

    // Reset the draggedImage state
    setDraggedImage( null );
  };

  return (
    <div
      className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      onDragOver={handleDragOver}
    >
      {galleryImages.map( ( image, index ) => (
        <div
          key={image.id}
          draggable
          onDragStart={() => handleDragStart( image )}
          onDrop={( e ) => handleDrop( e, index )} // Pass the dropIndex to handleDrop
          onDragOver={( e ) => e.preventDefault()}
        >
          <ImageCard image={image} />
        </div>
      ) )}
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
              {draggedImage.tags.map( ( tag ) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {tag}
                </span>
              ) )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ImageGallery; 