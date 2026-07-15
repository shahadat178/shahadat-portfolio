import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "https://shahadat-engineering-portfolio.vercel.app";
const SITE_TITLE = "Shahadat Sardar — Full-Stack & Cloud Software Engineer";
const SITE_DESCRIPTION =
  "The engineering portfolio of Shahadat Sardar: released products, full-stack systems, cloud delivery, and evidence-led technical decisions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Shahadat Sardar — Engineering Portfolio",
  authors: [{ name: "Shahadat Sardar", url: SITE_URL }],
  creator: "Shahadat Sardar",
  keywords: [
    "Shahadat Sardar",
    "full-stack software engineer",
    "cloud software engineer",
    "Next.js portfolio",
    "TypeScript",
    "product engineering",
    "Dhaka software engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Shahadat Sardar — Engineering Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/projects/shahadat-engineering-portfolio-v3.png",
        alt: "Responsive desktop and mobile views of Shahadat Sardar's engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/projects/shahadat-engineering-portfolio-v3.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
