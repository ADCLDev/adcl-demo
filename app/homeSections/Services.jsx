"use client"
import React from 'react'
import { motion } from "framer-motion";
import projects from "../data/projects.json"; // Assuming your project data is here

const Services = () => {
  return (
    <div className="w-full">
        <div className="my-16 text-center animate-fade-in">
          <h2 className="text-xl font-bold text-[#77D00] mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 lg:px-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="relative overflow-hidden rounded-xl shadow-lg group"
                whileHover={{
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: -10,
                  transition: { duration: 0.4 },
                }}
                style={{
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Services