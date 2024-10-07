import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = availableItems.slice(0, itemsPerLoad);
      setDisplayedItems(prevItems => [...prevItems, ...newItems]);
      setAvailableItems(prevAvailable => prevAvailable.slice(itemsPerLoad));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (availableItems.length > 0 && displayedItems.length === 0) {
      loadMoreItems();
    }
  }, [availableItems]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <Link href={`/projects/${item.category.toLowerCase()}/${item.id}`} key={item.id}>
            <motion.div
              className="relative group overflow-hidden rounded-lg shadow-lg h-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={item.src}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full filter grayscale transition-all duration-300 group-hover:filter-none"
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
      <div className="mt-8 text-center">
        {loading ? (
          <p className="text-center">Loading more items...</p>
        ) : availableItems.length > 0 ? (
          <button
            onClick={loadMoreItems}
            className="bg-black hover:text-[#FFD700] text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Load More
          </button>
        ) : (
          <p className="text-center">No more items to load.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;