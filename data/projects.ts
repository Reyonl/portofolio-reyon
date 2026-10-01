import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "daily-co",
    title: "DAILY.CO",
    description: "Web-Based Custom Screen Printing Mockup Design System",
    longDescription:
      "DAILY.CO is a full-stack web application built for a screen printing business. It provides clients with a real-time, browser-based design system to create custom mockups — placing artwork on apparel, selecting print zones, and previewing the final product before production.",
    repositoryUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Fabric.js",
      "Tailwind CSS",
    ],
    year: 2026,
    featured: true,
    image: "/compass.jpg",
    coverImage: "/nautical-bg.jpg",
    category: "Web Application",
    status: "completed",
    role: "Full Stack Development",
    context:
      "DAILY.CO was built for a local screen printing business that needed to modernize its order intake process. Clients were submitting design requests through messaging apps, which led to miscommunication and revision loops.",
    problem:
      "The manual design approval process required clients to describe their design ideas through text or rough sketches, wait for the production team to mock them up, send them back for review, and repeat the cycle until the client was satisfied. There was no shared visual language between the client and the printing team.",
    approach:
      "The solution was a self-serve design tool embedded directly into the order flow. Using Fabric.js on the frontend, clients can drag, scale, rotate, and position artwork on a live apparel preview with defined print zones. Laravel handles authentication, order management, and file persistence. The entire system runs in-browser — no software installation required.",
    result:
      "The design system gave clients full control over their mockup creation. Orders arrived with the design payload attached.",
    lessons:
      "Canvas-based applications require careful state management. Fabric.js provides powerful primitives but requires thoughtful architecture around serialization and restoration. Mobile canvas interaction requires special handling that differs significantly from desktop. Designing for non-technical users means simplicity must not sacrifice capability.",
    features: [
      "Interactive Fabric.js Canvas Editor",
      "Image Upload & Drag-and-Drop Positioning",
      "Multi-zone Design (Front, Back, Sleeve)",
      "Print Safe Area Visualization",
      "Smart Alignment Guidelines",
      "Design State Persistence (JSON serialization)",
      "Order Submission with Design Export",
      "Admin Panel with Design Verification",
    ],
    architectureNodes: [
      { label: "CUSTOMER", sublabel: "Web Browser" },
      { label: "CANVAS EDITOR", sublabel: "Fabric.js Interface", highlight: true },
      { label: "LARAVEL APPLICATION", sublabel: "Routes · Controllers · Models" },
      { label: "MYSQL DATABASE", sublabel: "Orders · Designs · Users" },
    ],
    challenges: [
      {
        title: "Canvas State Persistence",
        problem:
          "Saving and reliably restoring complex canvas states across sessions and page loads, including custom objects, transformations, and layer ordering.",
        solution:
          "Implemented full JSON serialization of the Fabric.js canvas state. The serialized state is stored server-side via the Laravel API, allowing precise canvas restoration on subsequent visits or after server-side design review.",
      },
      {
        title: "Responsive Canvas Interaction",
        problem:
          "The Fabric.js canvas rendered at a fixed pixel size, breaking the layout on different screen sizes and making mobile interaction difficult.",
        solution:
          "Built a dynamic scaling system that calculates canvas dimensions based on the available container width. Canvas coordinates are normalized so designs created on any viewport size render consistently across devices and during final export.",
      },
      {
        title: "Multi-Zone Design System",
        problem:
          "Clients needed to design multiple print zones (front, back, sleeves) independently while seeing how the full garment would look.",
        solution:
          "Implemented a zone-switching interface with separate Fabric.js canvas instances per zone, each maintaining independent state. A unified preview component composites all zones for the final order review.",
      },
      {
        title: "Design Integrity for Production",
        problem:
          "Exported designs needed to match production specifications precisely — correct resolution, correct placement within safe areas, and correct color representation.",
        solution:
          "Defined safe area overlays as non-editable canvas constraints. Export pipeline uses Fabric.js toDataURL at production resolution with configured DPI, ensuring the exported file matches what the client saw during design.",
      },
    ],
    logs: [
      {
        id: "LOG-01",
        label: "CONTEXT",
        title: "A print business with a manual bottleneck.",
        content:
          "DAILY.CO was built for a local screen printing business that relied on manual back-and-forth communication to produce design mockups. Clients sent rough sketches, waited for previews, requested changes, and repeated the cycle — slowing production and frustrating everyone involved.",
      },
      {
        id: "LOG-02",
        label: "THE PROBLEM",
        title: "No shared visual language between client and production.",
        content:
          "There was no standardized way for clients to communicate their design intent. Every order started with ambiguity and ended with at least one revision cycle. The production team spent significant time on mockup generation rather than actual printing.",
      },
      {
        id: "LOG-03",
        label: "APPROACH",
        title: "Self-serve design tool embedded in the order flow.",
        content:
          "The solution was a browser-based canvas design system built with Fabric.js. Clients interact directly with a live garment preview, placing artwork exactly where they want it. Laravel handles the backend: authentication, order management, design storage, and the admin verification workflow.",
      },
      {
        id: "LOG-04",
        label: "RESULT",
        title: "Orders arrive with the design attached.",
        content:
          "Clients can now create, modify, and finalize their designs independently. Orders are submitted with exportable mockup files, freeing the production team to focus on fulfillment.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
