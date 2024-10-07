import React, { useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

interface SectionArticleProps {
  title: string;
  content: string[];
}

const SectionArticle2: React.FC<SectionArticleProps> = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.2), transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 bg-gradient-to-tl from-slate-900 via-zinc-800/80 to-black shadow-lg rounded-lg overflow-hidden group cursor-pointer"
      initial={{ height: 'auto' }}
      animate={{ height: isHovered ? 'auto' : '150px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ zIndex: isHovered ? 10 : 1 }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 from-zinc-100/10 via-transparent to-transparent transition duration-1000 group-hover:opacity-50"
        style={style}
      />
      <motion.div
        className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
        style={style}
      />
      <h2 className="text-xl font-semibold mb-4 text-[#FFD700] group-hover:text-white">{title}</h2>
      <motion.ul 
        className="text-white space-y-2 overflow-hidden"
        animate={{ height: isHovered ? 'auto' : '2.5em' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {content.map((item: string, index: number) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center"
          >
            <motion.span
              className="w-2 h-2 bg-[#FFD700] rounded-full mr-2 flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            />
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
};

export default SectionArticle2;