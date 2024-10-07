import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

const SectionArticle: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

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
      <motion.div
        initial={false}
        animate={{ height: isHovered ? 'auto' : '3em' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p
          ref={contentRef}
          className="text-white"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: isHovered ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {content}
        </p>
      </motion.div>
    </motion.article>
  );
};

export default SectionArticle;