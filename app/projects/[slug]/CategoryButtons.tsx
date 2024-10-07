import React, { useState } from 'react';

interface CategoryButtonsProps {
  categories: string[];
  onFilterProjects: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, onFilterProjects }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const changeCategoryHandler = (category: string) => () => {
    setActiveCategory(category);
    onFilterProjects(category);
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {categories.map(category => (
        <button
          key={category}
          className={`inline-block px-4 py-2 capitalize transition-colors duration-300 ease-in-out ${
            activeCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={changeCategoryHandler(category)}
        >
          <span className='uppercase'>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
