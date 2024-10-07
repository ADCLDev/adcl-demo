"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import projects from "../data/projects.json"; // Assuming the JSON data is in the `data` folder

const ProjectSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-white">My Projects</h2>
        <p className="mt-4 text-center text-zinc-400">
          Here are some of the projects I have worked on recently.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <motion.div
                className="relative group overflow-hidden rounded-lg shadow-lg bg-cover bg-center h-80 transition-transform transform hover:scale-105"
                style={{ backgroundImage: `url(${project.imageUrl})` }} // Assuming `imageUrl` is the image source in your JSON
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="absolute inset-0 transition duration-500 ease-in-out bg-black bg-opacity-50 group-hover:bg-opacity-75"></div>

                <div className="absolute inset-0 transition-all duration-500 ease-in-out filter group-hover:grayscale">
                  {/* Placeholder image, color or style */}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-zinc-400">{project.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
