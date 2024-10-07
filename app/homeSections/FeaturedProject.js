"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import projects from "../data/projects.json"; // Assuming your project data is here

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const FeaturedProject = () => {
  return (
    <div className="w-full">
      <motion.div
        className="my-16 text-center animate-fade-in"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="m-12 py-3.5 px-0.5 z-10 text-6xl text-transparent duration-10 bg-black cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text">
          PROJECTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 lg:px-12">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <motion.div
                className="relative overflow-hidden rounded-xl shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: -10,
                  transition: { duration: 0.1 },
                }}
                style={{
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-[90%] bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 mb-4 rounded">
                  <h3 className="text-lg font-bold text-white uppercase">{project.title}</h3>
                  <p className="mt-2 text-sm text-white uppercase">{project.description}</p>

                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProject;