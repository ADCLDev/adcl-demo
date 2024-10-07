import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImagePopupProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLensActive, setIsLensActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePrevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoomLevel((prevZoom) => Math.max(0.5, Math.min(3, prevZoom + (e.deltaY > 0 ? -0.1 : 0.1))));
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 mt-20">
      <motion.div
        className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg overflow-hidden w-full h-full max-w-[90vw] max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-[#FFD700] focus:outline-none z-50 transition-colors duration-300"
        >
          <FaTimes className="h-8 w-8" />
        </button>

        <div
          className="relative w-full h-full z-20 flex justify-center items-center"
          onWheel={handleWheel}
        >
          <div className="relative w-full h-full" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
            <Image
              src={images[currentIndex]}
              alt={`Popup Image ${currentIndex + 1}`}
              fill
              style={{
                objectFit: 'contain',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s',
              }}
              className={`w-auto h-auto ${isLensActive ? "cursor-zoom-in" : "cursor-zoom-out"}`}
              onClick={() => setIsLensActive(!isLensActive)}
              priority
              quality={100}
            />
          </div>
        </div>

        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-[#FFD700] focus:outline-none z-50 transition-colors duration-300"
        >
          <FaChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FFD700] text-black rounded-full p-2 shadow-md hover:bg-black hover:text-[#FFD700] focus:outline-none z-50 transition-colors duration-300"
        >
          <FaChevronRight className="h-8 w-8" />
        </button>
      </motion.div>
    </div>
  );
};

export default ImagePopup;