// Page.tsx
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
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState<string>('');
  const slug = pathname.split('/').pop() || '';

  useEffect(() => {
    const categoryData = (projectData as ProjectCategory[]).find(category => category.slug === slug);

    if (categoryData) {
      setAllProjects(categoryData.projects);
      setCurrentCategoryTitle(categoryData.title);
      setCurrentCategory('all');

      const projectCategories = ['all', ...new Set(categoryData.projects.map(project => project.category))];
      setCategories(projectCategories);

      // Initially load up to 4 projects
      setDisplayedProjects(categoryData.projects.slice(0, 3));
    }
  }, [pathname]);

  const filterProjectsHandler = (category: string) => {
    setCurrentCategory(category);
    let filteredProjects = allProjects;
    if (category !== 'all') {
      filteredProjects = allProjects.filter(project => project.category === category);
    }
    // Reset displayed projects to first 4 of the filtered set
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
            <SectionHeader title={currentCategoryTitle} subtitle={`Our Recent Projects.`} />
            <div className="w-[80%] mx-auto">
              <CategoryButtons categories={categories} onFilterProjects={filterProjectsHandler} />
              <Projects 
                projects={displayedProjects} 
                slug={slug} 
                onLoadMore={loadMoreProjects} 
                hasMore={displayedProjects.length < (currentCategory === 'all' ? allProjects.length : allProjects.filter(p => p.category === currentCategory).length)}
              />
            </div>
          </section>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Page;

// "use client";

// import React, { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import SectionHeader from '../../components/section-header/sectionHeader';
// import CategoryButtons from './CategoryButtons';
// import Projects from './Projects';
// import { Navigation } from '@/app/components/nav';
// import Footer from '@/app/components/Footer';
// import projectData from '../../data/projects.json';

// // Import the ProjectData and Project types from your interface file
// import { ProjectData, Project, ProjectCategory } from '../ProjectInterface';

// const Page: React.FC = () => {
//   const pathname = usePathname();
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [currentCategory, setCurrentCategory] = useState<string>('');
//   const slug = pathname.split('/').pop() || '';

//   useEffect(() => {
//     const categoryData = (projectData as ProjectCategory[]).find(category => category.slug === slug);

//     if (categoryData) {
//       setProjects(categoryData.projects);
//       setCurrentCategory(categoryData.title);

//       // Extract unique categories from projects
//       const projectCategories = ['all', ...new Set(categoryData.projects.map(project => project.category))];
//       setCategories(projectCategories);
//     }
//   }, [pathname]);

//   const filterProjectsHandler = (category: string) => {
//     const categoryData = (projectData as ProjectCategory[]).find(cat => cat.slug === slug);
//     if (categoryData) {
//       if (category === 'all') {
//         setProjects(categoryData.projects);
//       } else {
//         const filteredProjects = categoryData.projects.filter(project => project.category === category);
//         setProjects(filteredProjects);
//       }
//     }
//   };

  

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-tl from-slate-400 via-zinc-100/20 to-slate-200 relative">
//       <Navigation pathName={pathname} />
      
//       <div className="flex-grow relative">
//         <div className="flex flex-col items-center">
//           <section className="py-12 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
//             <SectionHeader title={currentCategory} subtitle={`Our Recent ${currentCategory} Projects. Filter with buttons`} />
//             <div className="w-[80%] mx-auto">
//               <CategoryButtons categories={categories} onFilterProjects={filterProjectsHandler} />
//               <Projects projects={projects} slug={slug} />
//             </div>
//           </section>
//         </div>
//       </div>
      
//       <Footer/>
//     </div>
//   );
// }

// export default Page;