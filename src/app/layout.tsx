import type { Metadata } from "next";
import { Geist_Mono, Rajdhani, Pirata_One, Orbitron } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const pirataOne = Pirata_One({
  variable: "--font-pirata",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyen Khanh | Shadow Monarch Portfolio",
  description: "Fullstack Developer Portfolio - Next.js, React, TypeScript specialist. Beyond the S-Rank Experience.",
  keywords: ["portfolio", "fullstack developer", "nextjs", "react", "typescript", "frontend", "nguyen khanh"],
  authors: [{ name: "Nguyen Khanh" }],
  openGraph: {
    title: "Shadow Monarch Portfolio",
    description: "Beyond the S-Rank Experience - Fullstack Developer",
    type: "website",
    locale: "vi_VN",
    siteName: "Shadow Monarch Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadow Monarch Portfolio",
    description: "Beyond the S-Rank Experience",
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
    <html lang="en" className="lenis">
      <body
        className={`${geistMono.variable} ${rajdhani.variable} ${pirataOne.variable} ${orbitron.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
