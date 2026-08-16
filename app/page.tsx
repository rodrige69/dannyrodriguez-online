import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EvidenceStrip from "@/components/EvidenceStrip";
import LookFor from "@/components/LookFor";
import GhostTax from "@/components/GhostTax";
import RetainOS from "@/components/RetainOS";
import Building from "@/components/Building";
import HowIThink from "@/components/HowIThink";
import Experience from "@/components/Experience";
import About from "@/components/About";
import CTA from "@/components/CTA";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Nav variant="home" />
      <Hero />
      <EvidenceStrip />
      <LookFor />
      <GhostTax />
      <RetainOS />
      <Building />
      <HowIThink />
      <Experience />
      <About />
      <CTA />
      <RevealObserver />
    </>
  );
}
