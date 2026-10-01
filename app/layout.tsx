import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reyon Lau Jiemin — Software Engineer",
    template: "%s — Reyon Lau Jiemin",
  },
  description:
    "Software engineer and web application developer. I build practical web applications, interactive systems, and digital experiences that solve real problems.",
  keywords: [
    "Reyon Lau Jiemin",
    "software engineer",
    "web developer",
    "informatics engineering",
    "portfolio",
    "Laravel",
    "Next.js",
    "full-stack",
  ],
  authors: [{ name: "Reyon Lau Jiemin" }],
  creator: "Reyon Lau Jiemin",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Reyon Lau Jiemin — Software Engineer",
    description:
      "Software engineer and web application developer building practical systems that solve real problems.",
    siteName: "Reyon Lau Jiemin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyon Lau Jiemin — Software Engineer",
    description:
      "Software engineer and web application developer building practical systems that solve real problems.",
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
      className={`${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Nav />
        <ScrollProgress />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
