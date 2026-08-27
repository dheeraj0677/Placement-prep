import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PlacementPrep Radar — Real Interview Trends & Prep Insights",
  description:
    "Aggregating real interview experiences per tech company into topic breakdowns, round distributions, and personalized preparation checklists.",
  keywords: [
    "placement prep",
    "interview experiences",
    "interview questions",
    "DSA topics",
    "System Design",
    "Google interview",
    "Amazon interview",
    "Microsoft interview",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col antialiased selection:bg-blue-500/30 selection:text-blue-300">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
