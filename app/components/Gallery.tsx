import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import projectData from '../data/projects.json'; // Adjust the path as needed

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>([]);
  const [availableItems, setAvailableItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const itemsPerLoad = 6;

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: GalleryItem[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Initialize available items from project.json
    const allItems: GalleryItem[] = projectData.flatMap(category =>
      category.projects.map(project => ({
        id: project.id,
        src: project.image,
        title: project.title,
        description: project.description,
        category: category.title
      }))
    );
    // Shuffle the items
    const shuffledItems = shuffleArray([...allItems]);
    setAvailableItems(shuffledItems);
  }, []);

  const loadMoreItems = useCallback(() => {
    setLoading(true);
    setShowLoadingAnimation(true);

    loadingTimeoutRef.current = setTimeout(() => {
      const newItems = availableItems.slice(0, itemsPerLoad);
      setDisplayedItems(prevItems => [...prevItems, ...newItems]);
      setAvailableItems(prevAvailable => prevAvailable.slice(itemsPerLoad));
      setLoading(false);
      setShowLoadingAnimation(false);
    }, 3000);
  }, [availableItems]);

  useEffect(() => {
    if (availableItems.length > 0 && displayedItems.length === 0) {
      loadMoreItems();
    }
  }, [availableItems, displayedItems.length, loadMoreItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (bottomRef.current && !loading && availableItems.length > 0) {
        const rect = bottomRef.current.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight;

        if (isVisible) {
          loadMoreItems();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, availableItems.length, loadMoreItems]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedItems.map((item, index) => (
          <Link href={`/projects/${item.category.toLowerCase()}/${item.id}`} key={item.id}>
            <motion.div
              className="relative group overflow-hidden rounded-lg shadow-lg h-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover w-full h-full transition-all duration-300 filter grayscale group-hover:filter-none"
                priority={index < 8}
                loading={index < 8 ? 'eager' : 'lazy'}
                quality={75}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold uppercase">{item.title}</h3>
                <span className="text-xs mt-2 inline-block bg-white text-black px-2 py-1 rounded uppercase">
                  {item.category}
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <div ref={bottomRef} className="mt-8 text-center">
        <AnimatePresence>
          {showLoadingAnimation ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-lg font-semibold"
              >
                Load more
              </motion.p>
            </motion.div>
          ) : availableItems.length > 0 ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold"
            >
              Scroll further to load more
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold"
            >
              No more items to load.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;