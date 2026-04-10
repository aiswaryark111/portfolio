import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { useScrollReveal, fadeUp, scaleIn } from "../hooks/useScrollReveal";
import experience from "../data/experience.json";

function MetricCard({ value, label, delay }) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-ink-100 border border-ink-300 p-5 text-center group hover:border-aqua/30 transition-all duration-300"
    >
      <div className="font-serif text-3xl text-aqua font-semibold mb-1">
        {value}
      </div>
      <div className="font-mono text-[10px] text-parchment/65 tracking-widest uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, isInView } = useScrollReveal();
  const exp = experience[0];

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden bg-ink-50"
    >
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[60px] md:text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            Where I've
            <br />
            built & shipped
          </h2>
        </motion.div>

        {/* Experience Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <div className="lg:sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-aqua/10 border border-aqua/30 flex items-center justify-center">
                  <Briefcase size={16} className="text-aqua" />
                </div>
                <div className="w-px h-8 bg-aqua/20" />
              </div>

              <h3 className="font-serif text-2xl text-parchment font-bold mb-1">
                {exp.role}
              </h3>
              <p className="font-mono text-sm text-aqua font-semibold tracking-wider mb-4">
                {exp.company}
              </p>

              <div className="space-y-2 mb-8">
                <div className="font-mono text-xs text-parchment/70">
                  {exp.period}
                </div>
                <div className="font-mono text-xs text-parchment/60">
                  {exp.location}
                </div>
                <div className="inline-block border border-aqua/20 px-3 py-1">
                  <span className="font-mono text-[10px] text-aqua tracking-widest uppercase">
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm text-parchment/80 leading-relaxed">
                {exp.summary}
              </p>

              {/* Tech stack */}
              <div className="mt-8">
                <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-wider border border-ink-300 px-2 py-1 text-parchment/70 hover:border-aqua/40 hover:text-aqua transition-all cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="space-y-3 mb-10">
              {exp.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.5 + 2}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex items-start gap-4 p-4 border border-ink-300 group hover:border-aqua/20 transition-all duration-300"
                >
                  <CheckCircle2
                    size={14}
                    className="text-aqua mt-0.5 flex-shrink-0"
                  />
                  <p className="font-sans text-sm text-parchment/80 leading-relaxed group-hover:text-parchment transition-colors">
                    {h}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {exp.metrics.map((m, i) => (
                <MetricCard
                  key={m.label}
                  value={m.value}
                  label={m.label}
                  delay={i}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
