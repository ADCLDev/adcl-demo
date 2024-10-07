"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Particles from "./components/particles";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import SocialIcons from "./components/SocialIcon";
import ScrollHint from "./components/ScrollHint";
import AnimatedHeading from "./components/AnimatedHeading";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavbarVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (element: HTMLElement) => {
    isScrollingRef.current = true;
    element.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000); // Adjust this timeout based on your scroll duration
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const logoSection = logoRef.current;
      const gallerySection = galleryRef.current;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (logoSection && gallerySection) {
        const logoRect = logoSection.getBoundingClientRect();
        const galleryRect = gallerySection.getBoundingClientRect();

        // Scrolling down
        if (scrollTop > lastScrollTop.current && logoRect.bottom <= 0) {
          scrollTo(gallerySection);
          setIsLogoVisible(false);
        } 
        // Scrolling up
        else if (scrollTop < lastScrollTop.current && galleryRect.top >= windowHeight) {
          scrollTo(logoSection);
          setIsNavbarVisible(false);
          setTimeout(() => {
            setIsLogoVisible(true);
            setTimeout(() => setIsNavbarVisible(true), 1000);
          }, 500);
        }

        lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300" ref={logoRef}>
        {/* Navigation */}
        <nav
          className={`bg-transparent shadow-sm hover:shadow-xl hover:shadow-zinc-800 max-w-full py-6`}
        >
          <ul className="flex items-center justify-center gap-4 lg:mt-0 sm:mt-[100px]">
          {navigation.map((item) => (
             <Link
             key={item.href}
             href={item.href}
             className="p-4 rounded-md text-2xl bg-transparent shadow-l md:text-3xl duration-500 text-black hover:bg-black hover:text-white hover:border-[#FFD700] hover:shadow-md hover:shadow-zinc-800 hover:rounded-xl uppercase"
           >
             {item.name}
           </Link>
           
            ))}
          </ul>
        </nav>

        {/* Particles */}
        <Particles
          className={`absolute inset-0 -z-10 animate-fade-in ${
            isNavbarVisible ? 'opacity-100' : 'opacity-0'
          }`}
          quantity={100}
        />

        {/* Title */}
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <AnimatePresence>
            {isLogoVisible && (
              <motion.img
                src="/Arch logo 2.png"
                alt="ARCH Logo"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [-50, 0] }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-4/5 mx-auto block md:w-1/2 mt-0 mt-[-100px]"
              />
            )}
          </AnimatePresence>
          <ScrollHint/>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16 bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300" ref={galleryRef}>
        <AnimatedHeading text="GALLERY" />
        <Gallery />
      </section>
      <Footer/>
      <SocialIcons />
    </>
  );
}