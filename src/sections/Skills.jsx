import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Database, Settings } from "lucide-react";
import { useScrollReveal, fadeUp } from "../hooks/useScrollReveal";
import skillsData from "../data/skills.json";

const iconMap = {
  monitor: Monitor,
  server: Server,
  database: Database,
  settings: Settings,
};

function SkillBar({ name, level, delay, isInView }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-parchment/85 group-hover:text-parchment transition-colors font-medium">
          {name}
        </span>
        <span className="font-mono text-[10px] text-parchment/55 group-hover:text-aqua transition-colors">
          {level}%
        </span>
      </div>
      <div className="h-px bg-ink-300 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: "linear-gradient(90deg, #0F766E, #2DD4BF)" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay * 0.08 + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Glow on end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-aqua"
          style={{ boxShadow: "0 0 6px #2DD4BF" }}
          initial={{ left: 0 }}
          animate={isInView ? { left: `${level}%` } : { left: 0 }}
          transition={{
            duration: 1.2,
            delay: delay * 0.08 + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

function CategoryBlock({ category, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[category.icon] || Monitor;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="card group hover:border-aqua/20 transition-all duration-500"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 border border-aqua/20 flex items-center justify-center group-hover:border-aqua/50 transition-colors">
          <Icon
            size={14}
            className="text-aqua group-hover:text-aqua transition-colors"
          />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55">
            {String(delay + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-lg text-parchment font-semibold">
            {category.label}
          </h3>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-5">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={i}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-ink-50"
    >
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        04
      </div>

      {/* Grid BG */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {skillsData.categories.map((cat, i) => (
            <CategoryBlock key={cat.id} category={cat} delay={i} />
          ))}
        </div>

        {/* Tools / Extras */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-5">
            Additional Tools & Libraries
          </p>
          <div className="flex flex-wrap gap-3">
            {skillsData.tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 0.4, delay: i * 0.05 + 0.5 }}
                className="font-mono text-xs border border-ink-300 px-3 py-1.5 text-parchment/75
                           hover:border-aqua/50 hover:text-aqua transition-all duration-300 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
