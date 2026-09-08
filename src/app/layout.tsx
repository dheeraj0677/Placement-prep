import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DomainProvider } from "@/lib/DomainContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "PlacementPrep Radar — Real Interview Trends & Multi-Branch Prep Insights",
  description:
    "Aggregating authentic interview experiences across Software (SDE, AI, Cloud) and Hardware/Semiconductors (VLSI, Embedded, STA, ASIC) into topic breakdowns, round distributions, and personalized preparation checklists.",
  keywords: [
    "placement prep",
    "interview experiences",
    "interview questions",
    "DSA topics",
    "System Design",
    "VLSI",
    "Semiconductor placements",
    "Embedded Systems",
    "Verilog",
    "STA",
    "NVIDIA interview",
    "Intel interview",
    "Qualcomm interview",
    "Google interview",
    "Amazon interview",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased selection:bg-violet-500/20 selection:text-violet-900">
        <DomainProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </DomainProvider>
        <Analytics />
      </body>
    </html>
  );
}
