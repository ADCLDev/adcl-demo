import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from './Card2';

interface SocialLinkCardProps {
    href: string;
    icon: React.ReactNode;
    handle: string | string[];
    label: string;
  }
  

const SocialLinkCard: React.FC<SocialLinkCardProps> = ({ href, icon, handle, label }) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      <Link href={href} target="_blank" passHref>
        <motion.div
          className="relative flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100 h-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent opacity-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.6 }}
          />

          <motion.div
            className="relative z-10 flex items-center justify-center w-16 h-16 text-2xl bg-zinc-700 rounded-full border-2 border-zinc-600"
            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
          >
            {icon}
          </motion.div>

          <div className="z-10 flex flex-col items-center space-y-2">
            <motion.h2
              className="text-2xl font-bold text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {Array.isArray(handle) ? handle.join(' ') : handle}
            </motion.h2>
            <motion.p
              className="text-sm text-center text-zinc-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {label}
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-0 left-1/2 w-px h-12 bg-gradient-to-t from-zinc-500 to-transparent"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </Card>
  );
};

export default SocialLinkCard;