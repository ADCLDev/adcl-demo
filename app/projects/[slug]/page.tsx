"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SectionHeader from '../../components/section-header/sectionHeader';
import CategoryButtons from './CategoryButtons';
import Projects from './Projects';
import { Navigation } from '../../components/nav';
import Footer from '../../components/Footer';
import projectData from '../../data/projects.json';
import { ProjectCategory, Project } from '../ProjectInterface';

const Page: React.FC = () => {
  const pathname = usePathname();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState<string>('');
  const slug = pathname.split('/').pop() || '';

  useEffect(() => {
    const categoryData = (projectData as ProjectCategory[]).find(category => category.slug === slug);

    if (categoryData) {
      setAllProjects(categoryData.projects);
      setCurrentCategoryTitle(categoryData.title);

      if (categoryData.projects.length > 0) {
        setCurrentCategory('all');
        const projectCategories = ['all', ...new Set(categoryData.projects.map(project => project.category))];
        setCategories(projectCategories);
        setDisplayedProjects(categoryData.projects.slice(0, 3));
      } else {
        setDisplayedProjects([]);
        setCategories([]);
        setCurrentCategory('');
      }
    } else {
      // Reset everything if category not found
      setAllProjects([]);
      setDisplayedProjects([]);
      setCategories([]);
      setCurrentCategory('');
      setCurrentCategoryTitle('');
    }
  }, [pathname]);

  const filterProjectsHandler = (category: string) => {
    setCurrentCategory(category);
    let filteredProjects = allProjects;
    if (category !== 'all') {
      filteredProjects = allProjects.filter(project => project.category === category);
    }
    // Reset displayed projects to first 3 of the filtered set
    setDisplayedProjects(filteredProjects.slice(0, 3));
  };

  const loadMoreProjects = () => {
    let filteredProjects = allProjects;
    if (currentCategory !== 'all') {
      filteredProjects = allProjects.filter(project => project.category === currentCategory);
    }
    const currentCount = displayedProjects.length;
    const newProjects = filteredProjects.slice(currentCount, currentCount + 3);
    setDisplayedProjects(prev => [...prev, ...newProjects]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300 relative">
      <Navigation pathName={pathname} />
      
      <div className="flex-grow relative">
        <div className="flex flex-col items-center">
          <section className="py-12 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={currentCategoryTitle} subtitle="" />
            {allProjects.length > 0 && (
              <div className="w-[80%] mx-auto">
                <CategoryButtons categories={categories} onFilterProjects={filterProjectsHandler} />
                <Projects 
                  projects={displayedProjects} 
                  slug={slug} 
                  onLoadMore={loadMoreProjects} 
                  hasMore={displayedProjects.length < (currentCategory === 'all' ? allProjects.length : allProjects.filter(p => p.category === currentCategory).length)}
                />
              </div>
            )}
          </section>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Page;