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
      <div className="absolute right-6 md:right-12 top-24 font-serif text-[60px] md:text-[120px] text-ink-200 font-light leading-none select-none pointer-events-none">
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
          className="text-center mb-10"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let's build something
            <br />
            remarkable together
          </h2>
          <p className="font-sans text-sm text-parchment/70 max-w-lg mx-auto mt-6">
            Open to full-time roles, contract projects, and interesting
            collaborations.
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
            {/* <p className="font-mono text-[12px] tracking-widest uppercase text-parchment/55 mb-8">
              Find me here
            </p> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex flex-col items-center text-center gap-3 p-5  group hover:border-aqua/30 transition-all duration-300 h-full">
                    <div className="w-9 h-9  flex items-center justify-center flex-shrink-0 group-hover:border-aqua/40 transition-colors">
                      <Icon
                        size={16}
                        className="text-parchment/40 group-hover:text-aqua transition-colors"
                      />
                    </div>
                    <div className="text-center">
                      {/* <p className="font-mono text-[10px] tracking-widest uppercase text-parchment/55 mb-0.5 font-semibold">
                        {item.label}
                      </p> */}
                      <p className="font-sans text-sm text-parchment/90 group-hover:text-parchment transition-colors font-medium">
                        {item.value}
                      </p>
                    </div>
                    {/* {item.href && (
                      <div className="mt-auto text-parchment/20 group-hover:text-aqua transition-colors">
                        <span className="text-aqua">↗</span>
                      </div>
                    )} */}
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
            {/* <motion.div
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
            </motion.div> */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 inline-flex items-center gap-3 px-4 py-2.5"
              style={{
                background: "rgba(45, 212, 191, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(45, 212, 191, 0.15)",
                boxShadow:
                  "0 4px 24px rgba(45, 212, 191, 0.06), inset 0 1px 0 rgba(45, 212, 191, 0.1)",
              }}
            >
              {/* Ping dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aqua opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
              </span>

              {/* Divider */}
              <span className="w-px h-3 bg-aqua/20" />

              {/* Text */}
              <span className="font-mono text-[11px] tracking-widest uppercase text-aqua/80">
                {personalInfo.availability}
              </span>
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
