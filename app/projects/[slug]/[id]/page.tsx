"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Navigation } from '@/app/components/nav'
import Particles from '@/app/components/particles'
import ProjectDetails from './ProjectDetails'
import projectData from '../../../data/projects.json' // Adjust the path as needed
import { ProjectCategory, Project, ProjectDetails as ProjectDetailsType } from '../../ProjectInterface' // Adjust the path as needed

const Page = () => {
  const pathname = usePathname()
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType | null>(null)
  const [projectTitle, setProjectTitle] = useState<string>('')

  useEffect(() => {
    const pathParts = pathname.split('/')
    const slug = pathParts[pathParts.length - 2]
    const id = parseInt(pathParts[pathParts.length - 1], 10)

    const category = (projectData as ProjectCategory[]).find(cat => cat.slug === slug)
    if (category) {
      const project = category.projects.find(proj => proj.id === id)
      if (project) {
        setProjectDetails(project.details)
        setProjectTitle(project.title)
      }
    }
  }, [pathname])

  if (!projectDetails) {
    return <div>Loading...</div>
  }

  const { images, drawings, videoUrl, description, info } = projectDetails

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300">
      {/* Navigation */}
      <Navigation pathName={pathname} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col mt-20">
        <ProjectDetails
          title={projectTitle}
          images={images || []}
          drawings={drawings || []}
          videoUrl={videoUrl || ''}
          description={description || ''}
          info={info || ''}
        />
      </main>

      {/* Particles */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
    </div>
  )
}

export default Page