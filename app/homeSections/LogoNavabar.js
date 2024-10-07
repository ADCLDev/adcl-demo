"use client"
import Link from "next/link";
import Particles from "../components/particles";
import { motion } from "framer-motion";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

const LogoAndNavbar = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full w-screen flex flex-col bg-gradient-to-tl from-slate-400 via-zinc-300/20 to-slate-200"
    >
      <nav className="w-full py-6 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-md duration-500 text-zinc-900 hover:text-[#FFD700]"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-black cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          chronark
        </h1>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative bg-gradient-to-tl from-slate-400 via-zinc-300/20 to-slate-200"
    >
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-[#FFD700] mb-8">Services</h2>
        <div className="relative overflow-hidden">
          <div
            
            className="flex space-x-8 transition-transform duration-500 ease-out"
            style={{ overflowX: "hidden" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.slug}
                className="relative overflow-hidden rounded-xl shadow-lg group flex-shrink-0"
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
                  width: "calc(100% / 4)",
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

          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 focus:outline-none"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 focus:outline-none"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
    </>
    
  );
};

export default LogoAndNavbar;
