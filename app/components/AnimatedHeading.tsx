"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

interface AnimatedHeadingProps {
  text: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  // Remove "once" so animation plays every time it comes into view
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      // Reset to hidden when out of view
      controls.start("hidden");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "auto",
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center space-x-4 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div variants={logoVariants}>
        <Image 
          src="/arch_final_logo.svg" 
          alt="ADCL Logo" 
          width={150} 
          height={150} 
          className="object-contain"
        />
      </motion.div>
      <motion.h2 
        className="text-4xl font-bold text-center overflow-hidden whitespace-nowrap"
        variants={textVariants}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

export default AnimatedHeading;
