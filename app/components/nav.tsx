"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NavigationProps {
  pathName: string | null;
}

export const Navigation: React.FC<NavigationProps> = ({ pathName }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  const isProjectPage = pathName?.startsWith('/projects/') ?? false;
  const isProjectDetailPage = isProjectPage && (pathName?.split('/').length ?? 0) > 3;

  const renderNavItems = () => (
    <>
      {pathName !== '/projects' && (
        <Link
          href="/projects"
          className="block py-2 px-4 text-3xl text-black hover:text-white hover:bg-zinc-800 hover:rounded-xl uppercase"
        >
          Projects
        </Link>
      )}
      {pathName !== '/about' && (
        <Link
          href="/about"
          className="block py-2 px-4 text-3xl hover:text-white hover:bg-zinc-800 hover:rounded-xl"
        >
          About
        </Link>
      )}
      {pathName !== '/contact' && (
        <Link
          href="/contact"
          className="block py-2 px-4 text-3xl hover:text-white hover:bg-zinc-800 hover:rounded-xl uppercase"
        >
          Contact
        </Link>
      )}
    </>
  );

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-sm duration-500 transition-all ease-out ${
          isIntersecting
            ? "opacity-100 bg-transparent border-transparent shadow-md"
            : "opacity-80 bg-white border-zinc-800 shadow-lg"
        } uppercase`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-4">
            <Link
              href="/"
              className="duration-200 text-zinc-300 hover:text-zinc-100 hover:rounded-xl"
            >
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/arch_final_logo.svg"
                  alt="ADCL Logo"
                  width={120}
                  height={72}
                  className="hover:opacity-80 transition-opacity"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {renderNavItems()}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black hover:text-[#FFD700] focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black text-white overflow-hidden"
              >
                {renderNavItems()}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};