import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Reyon Lau Jiemin — open to project collaborations, freelance work, and new opportunities.",
};

const contactLinks = [
  {
    label: "EMAIL",
    value: "liurey55@gmail.com",
    href: "mailto:liurey55@gmail.com",
    external: false,
  },
  {
    label: "GITHUB",
    value: "github.com/Reyonl",
    href: "https://github.com/Reyonl",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal className="mb-20">
          <SectionHeader
            index="06"
            label="NEXT DESTINATION"
            heading={
              <>
                Let&apos;s build
                <br />
                something.
              </>
            }
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20">
          {/* Left */}
          <div className="space-y-8">
            <ScrollReveal>
              <p className="font-display text-xl text-[#888888] leading-relaxed">
                Open to collaborations, freelance projects, and opportunities
                in web development.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="text-[#555555] leading-relaxed text-sm">
                Whether you have a project in mind, want to discuss web
                development, or are looking for someone to build something
                with — send a message and let&apos;s talk.
              </p>
            </ScrollReveal>

            {/* Direct links */}
            <ScrollReveal delay={0.12}>
              <div className="pt-6 border-t border-[#222222]">
                <p className="meta-label mb-6">DIRECT LINKS</p>
                <div className="space-y-px">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between border border-[#222222] px-5 py-4 bg-[#0D0D0D] hover:border-[#C9B99A]/20 hover:bg-[#111111] transition-all duration-300"
                    >
                      <div>
                        <p className="meta-label mb-0.5">{link.label}</p>
                        <p className="font-mono text-[11px] text-[#555555] group-hover:text-[#C9B99A] transition-colors duration-200">
                          {link.value}
                        </p>
                      </div>
                      <span className="text-[#555555] group-hover:text-[#C9B99A] group-hover:translate-x-0.5 transition-all duration-200 font-mono text-sm">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal delay={0.1}>
            <form
              action="mailto:liurey55@gmail.com"
              method="GET"
              className="space-y-4"
              aria-label="Contact form"
            >
              <div>
                <label htmlFor="contact-name" className="meta-label block mb-2">
                  NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full bg-[#0D0D0D] border border-[#222222] px-4 py-3 font-mono text-[11px] text-[#F2F2F0] placeholder:text-[#333333] focus:outline-none focus:border-[#C9B99A]/40 transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="meta-label block mb-2"
                >
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full bg-[#0D0D0D] border border-[#222222] px-4 py-3 font-mono text-[11px] text-[#F2F2F0] placeholder:text-[#333333] focus:outline-none focus:border-[#C9B99A]/40 transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="meta-label block mb-2"
                >
                  SUBJECT
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What are you building?"
                  className="w-full bg-[#0D0D0D] border border-[#222222] px-4 py-3 font-mono text-[11px] text-[#F2F2F0] placeholder:text-[#333333] focus:outline-none focus:border-[#C9B99A]/40 transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="meta-label block mb-2"
                >
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="body"
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="w-full bg-[#0D0D0D] border border-[#222222] px-4 py-3 font-mono text-[11px] text-[#F2F2F0] placeholder:text-[#333333] focus:outline-none focus:border-[#C9B99A]/40 transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                id="contact-submit"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#F2F2F0] text-[#080808] font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#C9B99A] hover:gap-5"
              >
                SEND MESSAGE
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
