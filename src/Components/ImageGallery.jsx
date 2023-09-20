/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase"; // Initialize Firebase
import ImageCard from "./ImageCard"; // Create ImageCard component
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import DnD components
import imageJsonData from "../Data/Image.json"; // Import the JSON data

function ImageGallery() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // Other state variables for DnD, search, etc.

  useEffect(() => {
    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // Load images from JSON data
    setImages(imageJsonData);
    setLoading(false);

    return () => {
      // Cleanup (unsubscribe from auth changes, etc.)
    };
  }, []);

  // Implement DnD functionality
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dragged outside the list
    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  // Implement search functionality and other logic here

  return (
    <div className="container mx-auto mt-4">
      {loading ? (
        // Show loading spinner or skeleton loader here
        <div>Loading...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ImageCard image={image} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default ImageGallery;
