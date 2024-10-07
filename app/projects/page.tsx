"use client"
import Link from "next/link";
import React from "react";
import Particles from "../components/particles";
import FeaturedProject from "../homeSections/FeaturedProject";
import { motion } from "framer-motion";
import { Navigation } from "../components/nav";
import { usePathname } from "next/navigation";
// import Footer from "../components/Footer";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300 relative">
      {/* Navigation */}
      <Navigation pathName={pathname} />

      {/* Particles */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />

      {/* Featured Projects */}
      <div className="flex flex-grow items-center justify-center pt-20 md:pt-1">
        <FeaturedProject />
      </div>

      {/* <Footer/> */}
    </div>
  );
}
