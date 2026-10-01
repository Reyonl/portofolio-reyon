import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { productionUrl } from "@/lib/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Reyon Lau Jiemin — software engineer open to engineering work, collaborations, and interesting systems to build.",
  alternates: productionUrl ? { canonical: `${productionUrl}/contact` } : undefined,
};

// No contact form: this site has no backend and a mailto:GET form that opens
// the visitor's mail client with a half-filled body is worse UX than a direct
// mail link. Two honest channels, both verified.

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ]),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal className="mb-20">
          <p className="accent-label mb-5">CONTACT</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-[#F2F2F0] max-w-3xl mb-10">
            Tell me what
            <br />
            needs building.
          </h1>
          <p className="text-[#888888] leading-relaxed max-w-xl text-lg">
            Engineering work, freelance systems, or a problem you want someone
            to think through with — email is the fastest way to reach me.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#222222] border border-[#222222] max-w-3xl">
          <a
            href={`mailto:${profile.links.email}`}
            className="group bg-[#0D0D0D] p-8 lg:p-10 flex flex-col justify-between min-h-[180px] hover:bg-[#111111] transition-colors duration-300"
          >
            <div>
              <p className="meta-label mb-4">EMAIL</p>
              <p className="font-mono text-sm text-[#F2F2F0] break-all">{profile.links.email}</p>
            </div>
            <p className="meta-label text-[#888888] group-hover:text-[#C9B99A] transition-colors mt-6">
              WRITE DIRECTLY →
            </p>
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#0D0D0D] p-8 lg:p-10 flex flex-col justify-between min-h-[180px] hover:bg-[#111111] transition-colors duration-300"
          >
            <div>
              <p className="meta-label mb-4">GITHUB</p>
              <p className="font-mono text-sm text-[#F2F2F0]">github.com/{profile.links.githubHandle}</p>
            </div>
            <p className="meta-label text-[#888888] group-hover:text-[#C9B99A] transition-colors mt-6">
              INSPECT THE WORK ↗
            </p>
          </a>
        </div>

        <ScrollReveal delay={0.05}>
          <p className="mt-16 max-w-xl text-sm text-[#888888] leading-relaxed border-l border-[#222222] pl-6">
            If a project interests you, mention it by name — every case study
            on this site links to its repository or states plainly why it
            can&apos;t yet.
          </p>
          <div className="mt-8 flex gap-10">
            <Link href="/work" className="meta-label text-[#C9B99A] hover-line">
              BACK TO WORK →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
