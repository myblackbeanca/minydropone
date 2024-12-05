import { DropOptions } from "@/components/DropOptions";
import { Hero } from "@/components/Hero";
import { MinySlider } from "@/components/MinySlider";
import { Testimonials } from "@/components/Testimonials";
import { VisualShowcase } from "@/components/VisualShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <DropOptions  />
      <Testimonials />
      <VisualShowcase />
      <MinySlider />
    </>
  );
}
