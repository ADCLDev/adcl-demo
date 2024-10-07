import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const ScrollHint: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <motion.div
        className="text-black text-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <FaChevronDown />
      </motion.div>
      <p className="text-black mt-2">Scroll down</p>
    </div>
  );
};

export default ScrollHint;
