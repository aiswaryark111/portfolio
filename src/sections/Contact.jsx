import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { useScrollReveal, fadeUp, slideLeft } from "../hooks/useScrollReveal";
import personalInfo from "../data/personalInfo.json";
import links from "../data/links.json";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: links.email,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/aiswaryark111",
    href: links.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "aiswarya-radhakrishnan",
    href: links.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
];

export default function Contact() {
  const { ref, isInView } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mailto with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClasses = (field) => `
    w-full bg-transparent border-b py-3 font-sans text-sm text-parchment
    placeholder:text-parchment/20 outline-none transition-all duration-300
    ${focused === field ? "border-aqua" : "border-ink-300"}
  `;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Section number */}
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
        05
      </div>

      {/* Ambient light */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(45,212,191,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let's build something
            <br />
            remarkable together
          </h2>
          <p className="font-sans text-sm text-parchment/70 max-w-lg mx-auto mt-6">
            Open to full-time roles, contract projects, and interesting
            collaborations. Drop a message and I'll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-rows-1 lg:grid-rows-1 gap-16">
          {/* Left: Contact info */}
          <motion.div
            variants={slideLeft}
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="font-mono text-[12px] tracking-widest uppercase text-parchment/55 mb-8">
              Find me here
            </p>

            <div className="space-y-1">
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-center gap-5 p-5 border border-ink-300 group hover:border-aqua/30 transition-all duration-300">
                    <div className="w-9 h-9 border border-ink-300 flex items-center justify-center flex-shrink-0 group-hover:border-aqua/40 transition-colors">
                      <Icon
                        size={14}
                        className="text-parchment/40 group-hover:text-aqua transition-colors"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-0.5 font-semibold">
                        {item.label}
                      </p>
                      <p className="font-sans text-sm text-parchment/90 group-hover:text-parchment transition-colors font-medium">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <div className="ml-auto text-parchment/20 group-hover:text-aqua transition-colors">
                        <span className="text-aqua">↗</span>
                      </div>
                    )}
                  </div>
                );

                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    custom={i + 1}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 flex items-center gap-3 p-4 border border-aqua/20 bg-aqua/5"
            >
              <span className="w-2 h-2 rounded-full bg-aqua animate-pulse-slow flex-shrink-0" />
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-aqua mb-0.5 font-semibold">
                  Status
                </p>
                <p className="font-sans text-sm text-parchment/90 font-medium">
                  {personalInfo.availability}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          custom={6}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 pt-8 border-t border-ink-300 text-center"
        >
          {/* <span className="font-mono text-xs text-parchment/45">
            © 2025 Aiswarya Radhakrishnan
          </span> */}
          <span className="font-mono text-xs text-parchment/45">
            Built with React · Tailwind CSS · Framer Motion
          </span>
          {/* <div className="flex gap-4">
            {links.social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-parchment/55 hover:text-aqua transition-colors tracking-wider"
              >
                {s.label}
              </a>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
