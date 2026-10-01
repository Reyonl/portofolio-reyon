import { profile } from "@/content/profile";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Contact — the closing beat. Direct, low-friction, honest about channels.

export default function Contact() {
  return (
    <section className="border-t border-[#2A2E37] py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="accent-label mb-5">04 / CONTACT</p>
          <h2 id="contact-heading" className="font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.0] text-[#F5F7FA] max-w-3xl mb-10">
            If something here
            <br />
            looks <span className="text-[#63B3FF]">buildable</span>,
            <br />
            let&apos;s talk about it.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center">
            <a
              href={`mailto:${profile.links.email}`}
              className="group inline-flex items-center gap-4 px-7 py-3.5 bg-[#F5F7FA] text-[#08090C] font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[#63B3FF]"
            >
              {profile.links.email}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-label text-[#9AA1AD] hover:text-[#63B3FF] transition-colors hover-line"
            >
              GITHUB /{profile.links.githubHandle} ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
