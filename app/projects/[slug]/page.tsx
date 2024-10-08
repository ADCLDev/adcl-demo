"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/section-header/sectionHeader';
import CategoryButtons from './CategoryButtons';
import Projects from './Projects';
import { Navigation } from '../../components/nav';
import Footer from '../../components/Footer';
import projectData from '../../data/projects.json';
import { ProjectCategory, Project } from '../ProjectInterface';

const ProjectCard: React.FC<{ project: Project; slug: string }> = ({ project, slug }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        {!imageError ? (
          <img
            src={`/images/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
            <span>Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <a
          href={`/projects/${slug}/${project.id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          View Project
        </a>
      </div>
    </div>
  );
};


const SectionArticle: React.FC<{ title: string; content: string }> = ({ title, content }) => {
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
      animate={{ 
        height: 'auto',
        scale: isHovered ? 1.05 : 1
      }}
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
        animate={{ 
          height: 'auto',
          opacity: isHovered ? 1 : 0.7
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-white">
          {content}
        </p>
      </motion.div>
    </motion.article>
  );
};

const complianceApprovalContent = [
  {
    title: "",
    content: "Arch Design & Construction Limited has been involved in obtaining compliance approvals from various regulatory bodies in the construction industry in Bangladesh. These approvals are essential to ensure that building projects meet the necessary legal, safety, and environmental standards. The authorities involved include:"
  },
  {
    title: "",
    content: "RAJUK (Rajdhani Unnayan Kartripakkha): The central body for urban development and planning in Dhaka, ensuring adherence to building codes, land use policies, and development regulations."
  },
  {
    title: "",
    content: "CDA (Chittagong Development Authority): Responsible for regulating and approving construction projects in the Chittagong region."
  },
  {
    title: "",
    content: "Fire Service and Civil Defence: Approval from the Fire Service Department is required to ensure that buildings have adequate fire safety measures, such as emergency exits, fire alarms, and sprinkler systems."
  },
  {
    title: "",
    content: "City Corporations: Local city corporations (such as Dhaka North City Corporation and Dhaka South City Corporation) handle approvals related to utilities, waste management, and infrastructure support in urban areas."
  },
  {
    title: "",
    content: "Department of Environment (Poribesh): Provides environmental clearance to ensure that construction does not negatively impact the environment, including factors like air quality, waste disposal, and ecological balance."
  },
  {
    title: "",
    content: "Civil Aviation Authority: Compliance with height restrictions and other safety measures is mandatory for buildings located near airports, and approval from the Civil Aviation Authority is required to ensure these standards are met."
  },

  {
    title: "",
    content: "By coordinating with these bodies, Arch Design & Construction Limited ensures that their projects are compliant with legal standards, safe for public use, and environmentally sound."
  }

  
];

const Page: React.FC = () => {
  const pathname = usePathname();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const slug = pathname.split('/').pop() || '';

  useEffect(() => {
    if (slug === 'compliance-approval') {
      setCurrentCategoryTitle('Compliance Approval');
      return;
    }

    const categoryData = (projectData as ProjectCategory[]).find(category => category.slug === slug);

    if (categoryData) {
      setAllProjects(categoryData.projects);
      setCurrentCategoryTitle(categoryData.title);

      if (categoryData.projects.length > 0) {
        setCurrentCategory('all');
        const projectCategories = ['all', ...new Set(categoryData.projects.map(project => project.category))];
        setCategories(projectCategories);
        setDisplayedProjects(categoryData.projects.slice(0, 6));
        setHasMore(categoryData.projects.length > 6);
      } else {
        setDisplayedProjects([]);
        setCategories([]);
        setCurrentCategory('');
        setHasMore(false);
      }
    } else {
      setAllProjects([]);
      setDisplayedProjects([]);
      setCategories([]);
      setCurrentCategory('');
      setCurrentCategoryTitle('');
      setHasMore(false);
    }
  }, [pathname, slug]);

  const filterProjectsHandler = (category: string) => {
    setCurrentCategory(category);
    let filteredProjects = allProjects;
    if (category !== 'all') {
      filteredProjects = allProjects.filter(project => project.category === category);
    }
    setDisplayedProjects(filteredProjects.slice(0, 6));
    setHasMore(filteredProjects.length > 6);
  };

  const loadMoreProjects = useCallback(() => {
    if (!loading && hasMore) {
      setLoading(true);
      setTimeout(() => {
        let filteredProjects = allProjects;
        if (currentCategory !== 'all') {
          filteredProjects = allProjects.filter(project => project.category === currentCategory);
        }
        const currentCount = displayedProjects.length;
        const newProjects = filteredProjects.slice(currentCount, currentCount + 6);
        setDisplayedProjects(prev => [...prev, ...newProjects]);
        setHasMore(currentCount + newProjects.length < filteredProjects.length);
        setLoading(false);
      }, 1000);
    }
  }, [allProjects, currentCategory, displayedProjects, loading, hasMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreProjects();
        }
      },
      { threshold: 1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreProjects, loading, hasMore]);

  const renderContent = () => {
    if (slug === 'compliance-approval') {
      return (
        <>
          <SectionHeader title="Compliance Approval" subtitle="" />
          <div className="w-[80%] mx-auto mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complianceApprovalContent.map((item, index) => (
              <SectionArticle key={index} title={item.title} content={item.content} />
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <SectionHeader title={currentCategoryTitle} subtitle="" />
        {allProjects.length > 0 && (
          <div className="w-[80%] mx-auto">
            <CategoryButtons categories={categories} onFilterProjects={filterProjectsHandler} />
            <Projects projects={displayedProjects} slug={slug} onLoadMore={loadMoreProjects} hasMore={hasMore} />
            <div ref={loadingRef} className="mt-8 text-center">
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="text-lg font-semibold"
                    >
                      Loading more projects...
                    </motion.p>
                  </motion.div>
                )}
                {!hasMore && displayedProjects.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-semibold"
                  >
                    No more projects to load.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300 relative">
      <Navigation pathName={pathname} />
      
      <div className="flex-grow relative">
        <div className="flex flex-col items-center">
          <section className="py-12 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </section>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Page;