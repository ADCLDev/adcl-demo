import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { FaImage, FaRegLightbulb, FaPlayCircle, 
        FaInfoCircle, FaFileAlt } from 'react-icons/fa';
import ImagePopup from '../../../components/ImagePopup';

interface ProjectDetailsProps {
  title: string;
  images: string[];
  drawings: string[];
  videoUrl: string;
  description: string;
  info: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ title, images, drawings, videoUrl, description, info }) => {
  const [activeTab, setActiveTab] = useState<string>('IMAGES');
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const controls: AnimationControls = useAnimation();

  const [visibleImages, setVisibleImages] = useState<string[]>(images.slice(0, 8));
  const [visibleDrawings, setVisibleDrawings] = useState<string[]>(drawings.slice(0, 8));
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (activeTab === 'IMAGES') {
      const currentLength = visibleImages.length;
      const newImages = images.slice(currentLength, currentLength + 8);
      setVisibleImages(prevImages => [...prevImages, ...newImages]);
    } else if (activeTab === 'DRAWINGS') {
      const currentLength = visibleDrawings.length;
      const newDrawings = drawings.slice(currentLength, currentLength + 8);
      setVisibleDrawings(prevDrawings => [...prevDrawings, ...newDrawings]);
    }
    setAnimationComplete(false);
  }, [activeTab, images, drawings, visibleImages, visibleDrawings]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && animationComplete) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleLoadMore, animationComplete]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    controls.start({ opacity: 0 }).then(() => {
      controls.start({ opacity: 1 });
    });
    setAnimationComplete(false);
  };

  const handleImageClick = (image: string, index: number) => {
    setPopupImage(image);
    setCurrentImageIndex(index);
  };

  const handleClosePopup = () => {
    setPopupImage(null);
    setCurrentImageIndex(0);
  };

  const iconSize = 20;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    })
  };

  const renderImageGrid = (imageArray: string[], visibleArray: string[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {visibleArray.map((img, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => handleImageClick(img, index)}
          ref={index === visibleArray.length - 1 ? lastImageRef : null}
          onAnimationComplete={() => {
            if (index === visibleArray.length - 1) {
              setAnimationComplete(true);
            }
          }}
        >
          <Image
            src={img}
            alt={`Project ${activeTab === 'IMAGES' ? 'Image' : 'Drawing'} ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
            }}
            className="transition-transform duration-300 transform hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      const [left, ...rightParts] = line.split(':');
      const right = rightParts.join(':');
      return (
        <React.Fragment key={index}>
          <p className="mb-2">
            <span className="font-bold">{left.trim()}</span>
            {right && ': '}
            <span>{right.trim()}</span>
          </p>
        </React.Fragment>
      );
    });
  };

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md z-10 mb-8">
        <div className="py-4 px-2 sm:py-6 sm:px-4">
          {/* Project Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase">{title}</h1>

          {/* Header Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {['IMAGES', 'DRAWINGS', 'DESCRIPTION', 'INFORMATION', 'VIDEOS'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-300 ${
                  activeTab === tab 
                    ? 'bg-black text-[#FFD700] shadow-lg' 
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tab === 'IMAGES' && <FaImage className={`h-${iconSize} w-${iconSize}`} />}
                {tab === 'DRAWINGS' && <FaRegLightbulb className={`h-${iconSize} w-${iconSize}`} />}
                {tab === 'DESCRIPTION' && <FaFileAlt className={`h-${iconSize} w-${iconSize}`} />}
                {tab === 'INFORMATION' && <FaInfoCircle className={`h-${iconSize} w-${iconSize}`} />}
                {tab === 'VIDEOS' && <FaPlayCircle className={`h-${iconSize} w-${iconSize}`} />}
                
                <span className="hidden sm:inline">{tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow mt-4 sm:mt-6">
        <motion.div
          className="transition-opacity duration-500"
          animate={controls}
        >
          {(activeTab === 'IMAGES' || activeTab === 'DRAWINGS') && (
            <>
              {renderImageGrid(activeTab === 'IMAGES' ? images : drawings, activeTab === 'IMAGES' ? visibleImages : visibleDrawings)}
            </>
          )}

          {activeTab === 'VIDEOS' && videoUrl && (
            <motion.div
              className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 12 }}
            >
              <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </motion.div>
          )}

          {(activeTab === 'INFORMATION' ) && (
            <motion.div
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 12 }}
            >
              <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                {formatText(info)}
              </p>
            </motion.div>
          )}

          {(activeTab === 'DESCRIPTION') && (
            <motion.div
              className="bg-transparent bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 12 }}
            >
              <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                {formatText(description)}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Image Popup */}
      {popupImage && (
        <ImagePopup
          images={activeTab === 'IMAGES' ? images : drawings}
          initialIndex={currentImageIndex}
          onClose={handleClosePopup}
        />
      )}
    </motion.div>
  );
};

export default ProjectDetails;