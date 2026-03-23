import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import ThemeTransition from "@/components/ThemeTransition";

export default function Home() {
  return (
    <>
      <ThemeTransition />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
