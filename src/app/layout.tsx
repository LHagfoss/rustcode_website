import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  githubUrl,
  siteDescription,
  siteImage,
  siteName,
  siteUrl,
} from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RustCode — Native terminal AI coding agent",
    template: "%s | RustCode",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: githubUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/rustcode-logo.png",
    apple: "/images/rustcode-logo.png",
  },
  openGraph: {
    title: "RustCode — Native terminal AI coding agent",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteImage,
        width: 1078,
        height: 712,
        alt: "RustCode terminal interface running in a project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RustCode — Native terminal AI coding agent",
    description: siteDescription,
    images: [siteImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
