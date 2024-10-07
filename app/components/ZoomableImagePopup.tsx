import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface PopupProps {
  images: string[];
  onClose: () => void;
}

const ZoomableImagePopup: React.FC<PopupProps> = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        className="relative bg-transparent rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '80vw', height: '80vh' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none z-50"
        >
          <FaTimes className="h-8 w-8" />
        </button>
        <div className="relative w-full h-full z-20">
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <React.Fragment>
                <div className="absolute top-4 left-4 z-50 space-x-2">
                  <button
                    onClick={() => zoomIn()}
                    className="bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none"
                  >
                    +
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none"
                  >
                    -
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none"
                  >
                    Reset
                  </button>
                </div>
                <TransformComponent>
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Popup Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full"
                  />
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
        </div>
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none z-50"
        >
          <FaChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white focus:outline-none z-50"
        >
          <FaChevronRight className="h-8 w-8" />
        </button>
      </motion.div>
    </div>
  );
};

export default ZoomableImagePopup;