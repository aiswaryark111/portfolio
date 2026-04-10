import { motion } from 'framer-motion'
import { Award, MapPin, GraduationCap } from 'lucide-react'
import { useScrollReveal, fadeUp, fadeIn, slideLeft } from '../hooks/useScrollReveal'
import personalInfo from '../data/personalInfo.json'

function StatCard({ value, label, delay }) {
  const { ref, isInView } = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="border-l border-aqua/30 pl-6"
    >
      <div className="font-serif text-4xl text-aqua font-light mb-1">{value}</div>
      <div className="font-mono text-xs text-parchment/40 tracking-widest uppercase">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { ref: headRef, isInView: headInView } = useScrollReveal()
  const { ref: bioRef, isInView: bioInView } = useScrollReveal()
  const { ref: eduRef, isInView: eduInView } = useScrollReveal()

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

        {/* Left: Text */}
        <div>
          <motion.div
            ref={headRef}
            variants={fadeUp}
            initial="hidden"
            animate={headInView ? 'visible' : 'hidden'}
          >
            <p className="section-label">About Me</p>
            <h2 className="section-title mb-8">
              Crafting code that
              <br />
              <em>actually matters</em>
            </h2>
          </motion.div>

          <motion.div
            ref={bioRef}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={bioInView ? 'visible' : 'hidden'}
            className="space-y-5 text-parchment/60 leading-relaxed font-sans text-sm"
          >
            <p>{personalInfo.bio}</p>
            <p>
              Over 3 years at Experion Technologies, I've shipped solutions across sustainability (ESG platforms with GRI/SASB/TCFD compliance), mobility (EV charging apps), and HR tech — always balancing clean architecture with real delivery.
            </p>
            <p>
              Currently completing my MSc in Computing Science at Griffith College Dublin, deepening expertise in algorithms, system design, and modern software engineering practices.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <StatCard value="3+" label="Years Experience" delay={2} />
            <StatCard value="5+" label="Projects Shipped" delay={3} />
            <StatCard value="85%" label="Test Coverage" delay={4} />
          </div>

          {/* Location + availability */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate={headInView ? 'visible' : 'hidden'}
            className="flex items-center gap-6 mt-10"
          >
            <div className="flex items-center gap-2 text-parchment/40 font-mono text-xs">
              <MapPin size={12} className="text-aqua" />
              {personalInfo.location}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
              <span className="text-aqua/70">{personalInfo.availability}</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Education + Award */}
        <div className="space-y-6">
          <motion.div
            ref={eduRef}
            variants={slideLeft}
            initial="hidden"
            animate={eduInView ? 'visible' : 'hidden'}
          >
            <p className="section-label mb-6">Education</p>

            {personalInfo.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate={eduInView ? 'visible' : 'hidden'}
                className="card mb-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 border border-aqua/20 flex items-center justify-center flex-shrink-0 group-hover:border-aqua/50 transition-colors">
                    <GraduationCap size={14} className="text-aqua/60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-parchment text-lg font-light leading-tight mb-1">
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-xs text-aqua/70 tracking-wider mb-1">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-parchment/40">{edu.grade}</span>
                      <span className="font-mono text-xs text-parchment/30">{edu.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Award */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate={eduInView ? 'visible' : 'hidden'}
            className="relative border border-aqua/20 p-6 overflow-hidden group hover:border-aqua/40 transition-all duration-500"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 30% 50%, rgba(45,212,191,0.04), transparent 70%)' }} />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 bg-aqua/10 border border-aqua/30 flex items-center justify-center flex-shrink-0">
                <Award size={16} className="text-aqua" />
              </div>
              <div>
                <p className="font-mono text-xs text-aqua tracking-widest uppercase mb-1">
                  {personalInfo.award.year}
                </p>
                <h3 className="font-serif text-parchment text-lg font-light mb-2">
                  {personalInfo.award.title}
                </h3>
                <p className="font-sans text-xs text-parchment/50 leading-relaxed">
                  {personalInfo.award.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
