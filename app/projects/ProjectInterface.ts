export interface ProjectDetails {
  images?: string[];
  drawings?: string[];
  videoUrl?: string;
  description?: string;
  info?: string;
}

export interface Project {
  id: number;
  category: string;
  image: string;
  title: string;
  description: string;
  details: ProjectDetails;
}

export interface ProjectCategory {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  projects: Project[];
}

export type ProjectData = ProjectCategory[];