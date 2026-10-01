import { profile } from "@/content/profile";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Contact — the closing beat. Direct, low-friction, honest about channels.

export default function Contact() {
  return (
    <section className="border-t border-[#222222] py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="accent-label mb-5">CONTACT</p>
          <h2 id="contact-heading" className="font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.0] text-[#F2F2F0] max-w-3xl mb-10">
            If something here
            <br />
            looks <span className="text-[#C9B99A]">buildable</span>,
            <br />
            let&apos;s talk about it.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center">
            <a
              href={`mailto:${profile.links.email}`}
              className="group inline-flex items-center gap-4 px-7 py-3.5 bg-[#F2F2F0] text-[#080808] font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[#C9B99A]"
            >
              {profile.links.email}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-label text-[#888888] hover:text-[#C9B99A] transition-colors hover-line"
            >
              GITHUB /{profile.links.githubHandle} ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
