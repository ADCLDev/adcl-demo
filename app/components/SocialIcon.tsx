import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp, FaPlus, FaTimes, FaRegCommentDots } from "react-icons/fa";

const SocialIcons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-4">
      {/* Toggle Button */}
      <motion.div
        className="bg-black text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300"
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaRegCommentDots className="h-6 w-6" />
        )}
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className={`flex flex-col gap-4 ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        initial={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, translateX: isOpen ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <a
          href="tel:+8801910555777" // Replace with your phone number
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
          aria-label="Call us"
        >
          <FaPhoneAlt className="h-6 w-6" />
        </a>
        <a
          href="https://wa.me/8801910555777" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          aria-label="Message us on WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
      </motion.div>
    </div>
  );
};

export default SocialIcons;
