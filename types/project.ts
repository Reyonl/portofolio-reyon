// Project data model — superset of GitHub API fields.
// Phase 2: lib/github.ts will populate these from the GitHub API.

export interface VoyageLog {
  id: string;
  label: string;
  title: string;
  content: string;
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ArchitectureNode {
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  technologies: string[];
  year: number;
  featured: boolean;
  image?: string;
  coverImage?: string;
  category?: string;
  status?: "completed" | "in-progress" | "archived";
  role?: string;
  // Engineering case study fields
  context?: string;
  problem?: string;
  approach?: string;
  result?: string;
  lessons?: string;
  logs?: VoyageLog[];
  challenges?: Challenge[];
  features?: string[];
  architectureNodes?: ArchitectureNode[];
  // Phase 2 — GitHub API fields
  githubUrl?: string;
  stars?: number;
  forks?: number;
}
