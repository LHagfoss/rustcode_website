import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RustCode — Terminal pair programming",
  description: "A fast, native terminal agent for pair programming.",
  metadataBase: new URL("https://rustcode.lhagfoss.com"),
  icons: {
    icon: "/images/rustcode-logo.png",
    apple: "/images/rustcode-logo.png",
  },
  openGraph: {
    title: "RustCode — Terminal pair programming",
    description: "A fast, native terminal agent for pair programming.",
    url: "https://rustcode.lhagfoss.com",
    siteName: "RustCode",
    type: "website",
    images: [
      {
        url: "/images/header.png",
        width: 1078,
        height: 712,
        alt: "RustCode running in a terminal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RustCode — Terminal pair programming",
    description: "A fast, native terminal agent for pair programming.",
    images: ["/images/header.png"],
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
