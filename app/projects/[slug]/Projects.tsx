import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../ProjectInterface';

interface ProjectsProps {
  projects: Project[];
  slug: string;
  onLoadMore: () => void;
  hasMore: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ projects, slug, onLoadMore, hasMore }) => {
  if (projects.length === 0) {
    return <p className="text-center text-white text-3xl">No projects found in this category.</p>;
  }

  return (
    <div className="mt-12">
      <div className="grid gap-12 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))]">
        {projects.map(({ id, image, title, description }) => (
          <Link key={id} href={`/projects/${slug}/${id}`}>
            <div className="relative h-[20rem] overflow-hidden rounded-lg group">
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 filter group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-xl font-semibold text-white mb-2 uppercase">{title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            className="bg-black hover:text-[#FFD700] text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;