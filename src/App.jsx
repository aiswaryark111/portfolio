import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

// Noise overlay
function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

// Scroll progress bar
function ScrollProgress() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-aqua origin-left z-[60]"
      style={{
        scaleX: 0,
      }}
      whileInView={{ scaleX: 1 }}
    />
  );
}

function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="progress-bar"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        background: "linear-gradient(90deg, #0F766E, #2DD4BF)",
        transform: "scaleX(0)",
        transformOrigin: "0%",
      }}
    />
  );
}

export default function App() {
  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main>
        <AnimatePresence>
          <Home />
          <About />
          <Experience />
          <Achievements />
          <Projects />
          <Skills />
          <Contact />
        </AnimatePresence>
      </main>
    </>
  );
}
