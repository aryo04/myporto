import { Navbar, Footer, SmoothScroll, Global3DBackground } from "@/components/layout";
import {
  Hero,
  AboutMe,
  Skills,
  Experience,
  Projects,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <SmoothScroll>
      <Global3DBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <AboutMe />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
