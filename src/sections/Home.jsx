import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import personalInfo from "../data/personalInfo.json";
import links from "../data/links.json";

const ROLES = [
  "Full-Stack Software Engineer",
  "React & React Native Developer",
  "Node.js Backend Engineer",
  "AWS Serverless Developer",
];

function TypewriterText({ texts }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx <= current.length) {
      timeoutRef.current = setTimeout(() => setCharIdx((c) => c + 1), 80);
    } else if (!deleting && charIdx > current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => setCharIdx((c) => c - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="text-aqua font-serif">
      {display}
      <span className="animate-blink text-aqua/70">|</span>
    </span>
  );
}

// Floating particle grid
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-aqua rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden grid-bg"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)",
        }}
      />

      <ParticleField />

      {/* Vertical line accent */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(45,212,191,0.3), transparent)",
        }}
      />

      {/* Side label */}
      {/* <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="font-mono text-[10px] tracking-[0.4em] text-parchment/20 uppercase">
          Dublin, Ireland
        </span>
      </div> */}

      <div className="max-w-5xl relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-aqua animate-pulse-slow" />
          <span className="font-semibold text-xs tracking-[0.3em] uppercase text-aqua/70">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment leading-[0.95] mb-6"
        >
          Aiswarya
          <br />
          <span className="font-serif font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment/80">
            Radhakrishnan
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif text-2xl md:text-3xl text-parchment/90 mb-8 h-10"
        >
          <TypewriterText texts={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-xl font-sans text-base text-parchment/80 leading-relaxed mb-12"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <a href="#projects" className="aqua-btn group">
            View Projects
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
          <a href="#contact" className="ghost-btn">
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex items-center gap-6"
        >
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-parchment/60 hover:text-aqua transition-colors duration-300"
          >
            <Github size={18} />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-parchment/60 hover:text-aqua transition-colors duration-300"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={links.email}
            target="_blank"
            className="text-parchment/60 hover:text-aqua transition-colors duration-300"
          >
            <Mail size={18} />
          </a>
          {/* <div className="w-16 h-px bg-parchment/20" /> */}
          {/* <span className="font-mono text-xs text-parchment/55 tracking-widest sm:block">
            aiswaryark111@gmail.com
          </span> */}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-aqua" />
        </motion.div>
      </motion.div>

      {/* Year tag */}
      {/* <div className="absolute bottom-10 left-6 md:left-12">
        <span className="font-mono text-xs text-parchment/20">© 2025</span>
      </div> */}
    </section>
  );
}
