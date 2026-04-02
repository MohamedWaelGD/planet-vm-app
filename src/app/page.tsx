import Navbar from "@/components/Navbar";
import PlanetScroll from "@/components/PlanetScroll";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0b0b0b]">
      <Navbar />
      <PlanetScroll />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
