import Hero from "@/components/marketing/hero/Hero";
import TrustBar from "@/components/marketing/sections/TrustBar";
import PromiseProcess from "@/components/marketing/sections/PromiseProcess";
import WhyEagle from "@/components/marketing/sections/WhyEagle";
import Testimonials from "@/components/marketing/sections/Testimonials";
import CTA from "@/components/marketing/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PromiseProcess />
      <WhyEagle />
      {/* <Testimonials /> */}
      <CTA />
    </>
  );
}
