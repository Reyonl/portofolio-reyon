import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutSnippet from "@/components/home/AboutSnippet";
import Skills from "@/components/home/Skills";
import EngineeringLog from "@/components/home/EngineeringLog";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutSnippet />
      <Skills />
      <EngineeringLog />
      <CTA />
    </>
  );
}
