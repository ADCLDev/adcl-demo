import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectItemProps {
  project: Project;
  slug: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    // Add any other properties your project might have
  }
  
  export interface ProjectCategory {
    slug: string;
    title: string;
    projects: Project[];
  }

const ProjectItem: React.FC<ProjectItemProps> = ({ project, slug }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <Link href={`/projects/${slug}/${project.id}`}>
          <a className="text-blue-500 hover:text-blue-700">View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;