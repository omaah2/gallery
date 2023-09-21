/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import ImageCard from "./ImageCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import imageJsonData from "../Data/Image.json";
import Search from "./Search";

function ImageGallery() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    const updatedImages = imageJsonData.map((image) => ({
      ...image,
      title: image.tags[0],
    }));

    setImages(updatedImages);
    setFilteredImages(updatedImages);
    setLoading(false);

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    const filtered = images.filter((image) => {
      return image.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredImages(filtered);
  }, [images, searchTerm]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...filteredImages];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFilteredImages(items);
  };

return (
  <div className="container mx-auto mt-96">
    <Search handleSearch={setSearchTerm} />

    {loading ? (
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
              {filteredImages.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
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
