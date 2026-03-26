import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Sportstech sTread Pro - Premium Treadmill",
  description: "Discover the sTread Pro. German engineering, 21.5 inch screen, and LED lighting.",
};

export default function Home() {
  return (
    <main className="h-screen">
      <div className="h-[5%]"><Navbar /></div>
      <div className="h-[95%]"><Hero /></div>
    </main>
  );
}
