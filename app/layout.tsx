import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { productionUrl } from "@/lib/site";
import { websiteJsonLd } from "@/lib/jsonld";
import { profile } from "@/content/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: productionUrl ? new URL(productionUrl) : undefined,
  title: {
    default: "Reyon Lau Jiemin — Software Engineer",
    template: "%s — Reyon Lau Jiemin",
  },
  description:
    "Software engineer building practical web and mobile systems with AI-assisted development workflows. Case studies with verifiable evidence: Hermes DevOps, DAILY.CO, Warung Lupi.",
  keywords: [
    "Reyon Lau Jiemin",
    "software engineer",
    "web developer",
    "mobile developer",
    "developer automation",
    "informatics engineering",
    "portfolio",
    "Laravel",
    "Next.js",
    "TypeScript",
    "Flutter",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: productionUrl ?? undefined,
    siteName: "Reyon Lau Jiemin",
    title: "Reyon Lau Jiemin — Software Engineer",
    description:
      "Software engineer building practical web and mobile systems — with AI-assisted development workflows and verifiable evidence.",
  },
  twitter: {
    card: "summary",
    title: "Reyon Lau Jiemin — Software Engineer",
    description:
      "Practical software systems, shipped and verified: developer automation, web, mobile.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <Nav />
        <ScrollProgress />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
