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
      setIntersecting(entry.isIntersecting)
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

  const isProjectSubPage = pathName?.startsWith('/projects/') ?? false;

  const renderNavItems = (isMobile: boolean) => {
    const baseStyle = "block py-2 px-4 text-3xl text-black hover:text-white hover:bg-zinc-800 hover:rounded-xl uppercase";
    const linkStyle = isMobile ? `${baseStyle} bg-slate-300` : baseStyle;

    if (pathName === '/about') {
      return (
        <>
          <Link href="/projects" className={linkStyle}>Projects</Link>
          <Link href="/contact" className={linkStyle}>Contact</Link>
        </>
      );
    }

    if (pathName === '/contact') {
      return (
        <>
          <Link href="/projects" className={linkStyle}>Projects</Link>
          <Link href="/about" className={linkStyle}>About</Link>
        </>
      );
    }

    if (pathName === '/projects') {
      return (
        <>
          <Link href="/about" className={linkStyle}>About</Link>
          <Link href="/contact" className={linkStyle}>Contact</Link>
        </>
      );
    }

    if (isProjectSubPage) {
      return (
        <>
          <Link href="/projects" className={linkStyle}>Projects</Link>
          <Link href="/about" className={linkStyle}>About</Link>
          <Link href="/contact" className={linkStyle}>Contact</Link>
        </>
      );
    }

    // Default navigation items (e.g., for home page or any other unspecified page)
    return (
      <>
        <Link href="/projects" className={linkStyle}>Projects</Link>
        <Link href="/contact" className={linkStyle}>Contact</Link>
        <Link href="/about" className={linkStyle}>About</Link>
      </>
    );
  };

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
              {renderNavItems(false)}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black hover:text-yellow-400 focus:outline-none"
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
                className="md:hidden bg-slate-300 text-black overflow-hidden"
              >
                {renderNavItems(true)}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};