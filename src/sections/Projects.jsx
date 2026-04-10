import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronRight } from "lucide-react";
import { useScrollReveal, fadeUp, scaleIn } from "../hooks/useScrollReveal";
import projects from "../data/projects.json";

function ProjectCard({ project, index, onClick }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={() => onClick(project)}
      className="card group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`,
        }}
      />
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ background: project.color }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color}08, transparent 60%)`,
        }}
      />

      {/* Number */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-[10px] tracking-widest text-parchment/20">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* {project.featured && (
          <span
            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border"
            style={{ color: project.color, borderColor: `${project.color}40` }}
          >
            Featured
          </span>
        )} */}
      </div>

      <h3 className="font-serif text-xl text-parchment font-semibold mb-1 group-hover:text-aqua transition-colors duration-300">
        {project.title}
      </h3>
      <p className="font-mono text-xs text-parchment/65 tracking-wider mb-4">
        {project.subtitle}
      </p>
      <p className="font-sans text-sm text-parchment/80 leading-relaxed mb-6 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wider border border-ink-300 px-2 py-0.5 text-parchment/65"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="font-mono text-[10px] text-parchment/30">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-ink-300">
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-parchment/30 hover:text-aqua transition-colors"
            >
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-parchment/30 hover:text-aqua transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-parchment/55 group-hover:text-aqua transition-colors">
          View details <ChevronRight size={12} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-ink-100 border border-ink-300 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
        >
          {/* Top border */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            }}
          />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase mb-2 block"
                  style={{ color: project.color }}
                >
                  {project.subtitle}
                </span>
                <h3 className="font-serif text-3xl text-parchment font-bold">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 border border-ink-300 flex items-center justify-center text-parchment/40 hover:text-parchment hover:border-parchment/40 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <p className="font-sans text-sm text-parchment/85 leading-relaxed mb-8">
              {project.longDescription}
            </p>

            {/* Highlights */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-4">
                Key Features
              </p>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono text-xs mt-0.5 flex-shrink-0"
                      style={{ color: project.color }}
                    >
                      →
                    </span>
                    <span className="font-sans text-sm text-parchment/85">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider border px-2 py-1"
                    style={{
                      borderColor: `${project.color}30`,
                      color: `${project.color}aa`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-6 border-t border-ink-300">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aqua-btn text-xs"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn text-xs"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {!project.github && !project.live && !project.academic && (
                <p className="font-mono text-xs text-parchment/30">
                  Professional project — source code private
                </p>
              )}
              {project.academic && (
                <p className="font-mono text-xs text-parchment/30">
                  Academic project (Master's) — source code private
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const { ref, isInView } = useScrollReveal();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filters = ["all", "mobile", "fullstack"];
  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "mobile")
      return p.tags.some((t) => t.toLowerCase().includes("native"));
    if (filter === "fullstack")
      return p.tags.includes("NestJS") || p.tags.includes("Angular");
    return true;
  });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        03
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="section-label">Projects</p>
            <h2 className="section-title">
              Things I've
              <br />
              built with care
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[10px] tracking-widest uppercase px-3 py-2 border transition-all duration-200 ${
                  filter === f
                    ? "border-aqua text-aqua bg-aqua/50"
                    : "border-ink-300 text-parchment/40 hover:border-parchment/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onClick={setSelected}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
