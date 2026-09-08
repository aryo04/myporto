import { Navbar, Footer, SmoothScroll } from "@/components/layout";
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
      <Navbar />
      <main className="flex-grow">
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
