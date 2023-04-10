import React, { useState, useEffect } from "react";

const Carousel = ({ images, interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      );
    }, interval);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length, interval]);

  return (
    <div>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
