import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "../ui/ScrollReveal";
import skillsData from "../data/skills.json";
import { fadeUp, useScrollReveal } from "../hooks/useScrollReveal";

const CATEGORY_META = [
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    accent: "#2dd4bf",
    number: "01",
  },
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    accent: "#818cf8",
    number: "02",
  },
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    accent: "#34d399",
    number: "03",
  },
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="9" />
        <line x1="12" y1="15" x2="12" y2="21" />
      </svg>
    ),
    accent: "#fb923c",
    number: "04",
  },
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: "#f472b6",
    number: "05",
  },
  {
    lucide: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="2" x2="9" y2="4" />
        <line x1="15" y1="2" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="22" />
        <line x1="15" y1="20" x2="15" y2="22" />
        <line x1="20" y1="9" x2="22" y2="9" />
        <line x1="20" y1="15" x2="22" y2="15" />
        <line x1="2" y1="9" x2="4" y2="9" />
        <line x1="2" y1="15" x2="4" y2="15" />
      </svg>
    ),
    accent: "#38bdf8",
    number: "06",
  },
];

function SkillTag({ skill, accent, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-mono text-xs px-3 py-1.5 border cursor-default transition-all duration-200 inline-block"
      style={{
        borderColor: hovered ? accent : "rgba(85,85,85,0.5)",
        color: hovered ? accent : "rgba(224,224,224,0.7)",
        background: hovered ? `${accent}12` : "transparent",
        boxShadow: hovered ? `0 0 12px ${accent}25` : "none",
      }}
    >
      {typeof skill === "object" ? skill.name : skill}
    </motion.span>
  );
}

function CategoryCard({ cat, meta }) {
  const [cardHovered, setCardHovered] = useState(false);
  return (
    <motion.div
      className="relative border border-ink-500 overflow-hidden group h-full"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        boxShadow: cardHovered ? `0 8px 32px ${meta.accent}15` : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Animated top border */}
      {/* <motion.div
        className="absolute top-0 left-0 h-0.5"
        style={{ background: meta.accent }}
        animate={{ width: cardHovered ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      /> */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${meta.accent}08, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 border flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                borderColor: cardHovered ? meta.accent : "rgba(85,85,85,0.5)",
                color: cardHovered ? meta.accent : "rgba(136,136,136,0.8)",
                background: cardHovered ? `${meta.accent}12` : "transparent",
              }}
            >
              {meta.lucide}
            </motion.div>
            <div>
              <span
                className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
                style={{
                  color: cardHovered ? meta.accent : "rgba(136,136,136,0.8)",
                }}
              >
                {cat.label}
              </span>
              <p className="font-mono text-[9px] text-ink-300 mt-0.5">
                {cat.skills.length} technologies
              </p>
            </div>
          </div>
          <span
            className="font-mono text-xs transition-colors duration-300"
            style={{ color: cardHovered ? meta.accent : "rgba(85,85,85,0.4)" }}
          >
            {meta.number}
          </span>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-5"
          style={{
            background: cardHovered
              ? `linear-gradient(to right, ${meta.accent}60, transparent)`
              : "rgba(85,85,85,0.3)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2">
          {cat.skills.map((skill, i) => (
            <SkillTag
              key={skill}
              skill={skill}
              accent={meta.accent}
              index={i}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isInView } = useScrollReveal();
  const totalTech = skillsData.categories.reduce(
    (acc, c) => acc + c.skills.length,
    0,
  );

  return (
    <section id="skills" className="py-28 px-6 relative bg-ink-600">
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[60px] md:text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        04
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(45,212,191,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <p className="section-label">Skills</p>
          <h2 className="section-title">
            Tools of
            <br />
            the craft
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <ScrollReveal delay={0.15}>
            <p className="text-ink-200 text-sm font-mono">
              {totalTech}+ technologies &middot; {skillsData.categories.length}{" "}
              domains
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {skillsData.categories.map((cat, i) => (
            <StaggerItem key={cat.label} className="h-full">
              <CategoryCard cat={cat} meta={CATEGORY_META[i]} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3} className="mt-20">
          <div className="overflow-hidden border-y border-ink-500 py-4 relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink-600 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink-600 to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              {[
                ...skillsData.categories.flatMap((c) => c.skills),
                ...skillsData.categories.flatMap((c) => c.skills),
              ].map((s, i) => (
                <span
                  key={i}
                  className="font-mono text-sm text-ink-250 flex items-center gap-3 tracking-wider"
                >
                  <span className="text-aqua text-xs">◆</span>
                  {s}
                </span>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
