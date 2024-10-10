import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from "../components/card";
import { Mail } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

interface Social {
  href: string;
  icon: JSX.Element;
  handle: string;
  label: string;
}

const SocialLinkCard: React.FC<Social> = ({ href, icon, handle, label }) => (
  <Card>
    <Link href={href} passHref>
      <motion.a
        className="p-4 bg-black relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-12 lg:py-16 md:px-8 h-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-300 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-800 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
          {icon}
        </span>
        <div className="z-10 flex flex-col items-center text-center">
          <span className="text-lg lg:text-xl font-medium duration-150 text-zinc-200 group-hover:text-white font-display">
            {handle}
          </span>
          <span className="mt-2 text-sm duration-300 text-zinc-400 group-hover:text-zinc-200">
            {label}
          </span>
        </div>
      </motion.a>
    </Link>
  </Card>
);

export default SocialLinkCard