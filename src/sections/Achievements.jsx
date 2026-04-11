import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import { useScrollReveal, fadeUp } from "../hooks/useScrollReveal";
import personalInfo from "../data/personalInfo.json";

export default function Achievements() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-hidden"
    >
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[60px] md:text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none  hidden md:block">
        03
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
          <p className="section-label">Achievements</p>
          <h2 className="section-title">
            Rewards &<br />
            recognition
          </h2>
        </motion.div>

        {/* Award Card */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative border border-aqua/20 overflow-hidden group hover:border-aqua/40 transition-all duration-500 max-w-2xl"
          style={{
            background: "rgba(45, 212, 191, 0.02)",
          }}
        >
          {/* Top gradient border */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(45,212,191,0.6), transparent)",
            }}
          />

          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(45,212,191,0.05), transparent 70%)",
            }}
          />

          {/* Frosted number background */}
          <div
            className="absolute right-6 top-1/2 -translate-y-1/2 font-serif font-bold text-[100px] leading-none select-none pointer-events-none opacity-[0.03]"
            style={{ color: "#2dd4bf" }}
          >
            01
          </div>

          <div className="p-8 relative z-10">
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="w-12 h-12 bg-aqua/10 border border-aqua/30 flex items-center justify-center flex-shrink-0 group-hover:border-aqua/60 transition-colors">
                <Award size={20} className="text-aqua" />
              </div>

              <div className="flex-1">
                {/* Year + org */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-aqua">
                    {personalInfo.award.year}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-aqua/40" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-parchment/60">
                    {personalInfo.award.org}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl text-parchment font-semibold mb-3">
                  {personalInfo.award.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-parchment/70 leading-relaxed">
                  {personalInfo.award.description}
                </p>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="text-aqua fill-aqua" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
