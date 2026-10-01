// Phase 2: Replace this stub with real GitHub API calls.
// The function signature is intentionally identical to the mock data source
// so swapping is a one-line import change in each page.

import type { Project } from "@/types/project";

/**
 * Fetch all projects — will call GitHub API in Phase 2.
 * Currently returns null to signal "use mock data".
 */
export async function getProjectsFromGitHub(): Promise<Project[] | null> {
  // TODO Phase 2: implement GitHub REST/GraphQL fetch
  // const res = await fetch(`https://api.github.com/users/Reyonl/repos`, {
  //   headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
  //   next: { revalidate: 3600 },
  // });
  return null;
}

/**
 * Fetch a single project by slug from GitHub.
 * Currently returns null to signal "use mock data".
 */
export async function getProjectFromGitHub(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slug: string
): Promise<Project | null> {
  return null;
}
