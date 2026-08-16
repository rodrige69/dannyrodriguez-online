import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EvidenceStrip from "@/components/EvidenceStrip";
import LookFor from "@/components/LookFor";
import GhostTax from "@/components/GhostTax";
import RetainOS from "@/components/RetainOS";
import Building from "@/components/Building";
import Lab from "@/components/Lab";
import HowIThink from "@/components/HowIThink";
import Experience from "@/components/Experience";
import About from "@/components/About";
import FieldNotesPreview from "@/components/FieldNotesPreview";
import CTA from "@/components/CTA";
import RevealObserver from "@/components/RevealObserver";
import { sanityFetch } from "@/sanity/lib/fetch";
import { rightNowQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const rightNow = await sanityFetch<{ navSummary?: string }>(rightNowQuery);

  return (
    <>
      <Nav variant="home" nowText={rightNow?.navSummary} />
      <Hero />
      <EvidenceStrip />
      <LookFor />
      <GhostTax />
      <RetainOS />
      <Building />
      <Lab />
      <HowIThink />
      <Experience />
      <About />
      <FieldNotesPreview />
      <CTA />
      <RevealObserver />
    </>
  );
}
