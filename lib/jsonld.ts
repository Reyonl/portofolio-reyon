// JSON-LD builders (P4). Only schema that matches the page it renders on —
// Person/WebSite on home; ProfilePage+BreadcrumbList on /work; TechArticle+
// BreadcrumbList on each case study. No aggregateRating, no employer, no
// events, nothing unverifiable.
import { profile } from "@/content/profile";
import { productionUrl } from "@/lib/site";
const base = productionUrl ?? "";
import type { Project } from "@/content/schema";

const topics = [
  "TypeScript", "Node.js", "Next.js", "React", "Laravel", "Livewire",
  "MySQL", "Flutter", "Fabric.js", "Tailwind CSS", "GitHub Actions",
  "Git", "Developer automation", "Web development", "Mobile development",
];

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.positioningLines.join(" "),
    url: `${base}/about`,
    sameAs: [profile.links.github],
    knowsAbout: [...profile.focus, ...topics],
    knowsLanguage: ["id", "en"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: `${base}/`,
    inLanguage: "en",
    creator: { "@type": "Person", name: profile.name },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${base}/`,
    mainEntity: personJsonLd(),
  };
}

export function breadcrumbJsonLd(parts: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: parts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      item: `${base}${p.path}`,
    })),
  };
}

export function projectJsonLd(p: Project) {
  const node: Record<string, unknown> = {
    "@type": "TechArticle",
    headline: `${p.title} — engineering case study`,
    description: p.summary,
    url: `${base}/work/${p.slug}`,
    inLanguage: "en",
    author: { "@type": "Person", name: profile.name },
    keywords: p.stack.join(", "),
    about: p.category,
  };
  if (p.links.repo) {
    node.profiler = { "@type": "SoftwareSourceCode", codeRepository: p.links.repo };
  }
  return node;
}
