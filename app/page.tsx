import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import FlagshipStory from "@/components/home/FlagshipStory";
import HowIWork from "@/components/home/HowIWork";
import Background from "@/components/home/Background";
import Contact from "@/components/home/Contact";

// Homepage IA (P1.1 §6):
// HERO → NOW (inside hero) → SELECTED WORK → FLAGSHIP STORY → HOW I WORK
// → BACKGROUND → CONTACT. Every section reads from content/ — zero hardcoded
// claims in components, and the whole homepage is Server Components.

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <FlagshipStory />
      <HowIWork />
      <Background />
      <Contact />
    </>
  );
}
