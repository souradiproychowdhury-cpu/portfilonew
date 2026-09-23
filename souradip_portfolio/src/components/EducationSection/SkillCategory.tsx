import { motion, AnimatePresence, type Transition, type TargetAndTransition } from "framer-motion";
import {
  Atom,
  Server,
  Code2,
  Database,
  Brain,
  Workflow,
  Lightbulb,
  Users,
  Rocket,
  Cpu,
  Globe,
  Palette,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { BorderBeam } from "../lightswind/border-beam";

export default function ProfessionalProfile() {
  const getGoogleSearchUrl = (query: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  interface TechSkill {
    name: string;
    domain: string;
    searchQuery: string;
    icon: typeof Atom;
    color: string;
    borderGlow: string;
    iconBg: string;
    signalColor: string;
    accentGradient: string;
    iconAnimation: TargetAndTransition;
    iconTransition: Transition;
  }

  const technicalSkills: TechSkill[] = [
    {
      name: "JavaScript / React.js",
      domain: "Frontend & Modern UI",
      searchQuery: "what is JavaScript and React.js",
      icon: Atom,
      color: "text-cyan-400",
      borderGlow: "hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]",
      iconBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]",
      signalColor: "bg-cyan-400",
      accentGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      iconAnimation: { rotate: [0, 360] },
      iconTransition: { duration: 12, repeat: Infinity, ease: "linear" },
    },
    {
      name: "Python",
      domain: "AI Logic & Automation",
      searchQuery: "what is Python programming language",
      icon: Cpu,
      color: "text-yellow-400",
      borderGlow: "hover:border-yellow-400/70 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]",
      iconBg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 group-hover:bg-yellow-500/25 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]",
      signalColor: "bg-yellow-400",
      accentGradient: "from-yellow-500/20 via-yellow-500/5 to-transparent",
      iconAnimation: { scale: [1, 1.12, 1] },
      iconTransition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
    {
      name: "Node.js / Express",
      domain: "Backend APIs & Services",
      searchQuery: "what is Node.js and Express.js",
      icon: Server,
      color: "text-emerald-400",
      borderGlow: "hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
      iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/25 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      signalColor: "bg-emerald-400",
      accentGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      iconAnimation: { y: [0, -2, 0] },
      iconTransition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    {
      name: "HTML5 / CSS3",
      domain: "Responsive Design & Styling",
      searchQuery: "what is HTML5 and CSS3 in web development",
      icon: Code2,
      color: "text-blue-400",
      borderGlow: "hover:border-blue-400/70 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
      iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-500/25 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      signalColor: "bg-blue-400",
      accentGradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      iconAnimation: { scale: [1, 1.08, 1] },
      iconTransition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    {
      name: "MongoDB / Databases",
      domain: "NoSQL & Data Architecture",
      searchQuery: "what is MongoDB database",
      icon: Database,
      color: "text-amber-400",
      borderGlow: "hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]",
      iconBg: "bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500/25 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]",
      signalColor: "bg-amber-400",
      accentGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
      iconAnimation: { rotate: [0, -6, 6, 0] },
      iconTransition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    },
  ];

  const familiarTools = [
    "Java", "TypeScript", "Git / GitHub", "Vite", "REST APIs", 
    "Claude API", "Groq / Llama", "Wikipedia API", "Vercel", "Render", "Figma"
  ];

  const softSkills = [
    { name: "Problem Solving", icon: Brain, color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { name: "Creative Thinking", icon: Lightbulb, color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
    { name: "Fast Learner", icon: Rocket, color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
    { name: "Team Collaboration", icon: Users, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { name: "AI Integration", icon: Cpu, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    { name: "Hackathon Mindset", icon: Globe, color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" },
    { name: "UI/UX Design", icon: Palette, color: "text-pink-400 border-pink-500/30 bg-pink-500/10" },
    { name: "Agile Workflow", icon: Workflow, color: "text-teal-400 border-teal-500/30 bg-teal-500/10" },
  ];

  return (
    <motion.section
      id="skills"
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Expertise &amp; Skills</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Click any skill or tool to learn what it is on Google</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="glass-panel p-8 rounded-[2rem] border border-cyan-500/25 shadow-[0_0_35px_rgba(6,182,212,0.15)] relative overflow-hidden bg-card/80 backdrop-blur-xl">
          <BorderBeam size={80} duration={7} colorFrom="#06b6d4" colorTo="#8b5cf6" borderWidth={1.5} />
          
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          {/* Header */}
          <div className="flex items-center justify-between mb-7 pb-4 border-b border-border/60 relative z-10">
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Server className="w-5 h-5" />
              </span>
              Technical Arsenal
            </h4>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>CORE STACK</span>
            </div>
          </div>

          {/* Skills List with Clickable Cyber Cards */}
          <div className="space-y-3.5 relative z-10">
            {technicalSkills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.a
                  key={skill.name}
                  href={getGoogleSearchUrl(skill.searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Click to search "${skill.name}" on Google`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card/95 transition-all duration-300 overflow-hidden cursor-pointer ${skill.borderGlow}`}
                >
                  {/* Neon Left Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${skill.signalColor} opacity-50 group-hover:opacity-100 group-hover:w-2 transition-all duration-300 shadow-[0_0_8px_currentColor]`}
                  />

                  {/* Shimmer Sweep Effect on Hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Icon & Label */}
                  <div className="flex items-center gap-3.5 relative z-10 pl-1.5">
                    <div className={`p-2.5 rounded-xl border shrink-0 transition-all duration-300 ${skill.iconBg}`}>
                      <motion.div
                        animate={skill.iconAnimation}
                        transition={skill.iconTransition}
                        className="flex items-center justify-center"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <div>
                      <span className="text-foreground text-[15px] font-bold tracking-wide group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {skill.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </span>
                      <span className="text-muted-foreground text-xs font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
                        {skill.domain}
                      </span>
                    </div>
                  </div>

                  {/* Animated HUD Equalizer / Signal Lights */}
                  <div className="flex items-center gap-1 pl-3 relative z-10 pr-1">
                    {[0, 1, 2, 3].map((bar) => (
                      <motion.span
                        key={bar}
                        className={`w-1.5 rounded-full ${skill.signalColor} opacity-35 group-hover:opacity-100 transition-opacity duration-200 shadow-sm`}
                        style={{ height: `${12 + bar * 3}px` }}
                        animate={{
                          opacity: [0.25, 0.85, 0.25],
                          scaleY: [0.85, 1.15, 0.85],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: bar * 0.22 + i * 0.12,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Extra tools / Familiar Tags */}
          <div className="mt-7 pt-5 border-t border-border/60 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Also familiar with
              </p>
              <span className="text-[11px] text-muted-foreground/80 font-mono">11+ TOOLS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {familiarTools.map((t) => (
                <motion.a
                  key={t}
                  href={getGoogleSearchUrl(`what is ${t}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Search "${t}" on Google`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-foreground/5 hover:bg-cyan-500/15 border border-foreground/10 hover:border-cyan-400/50 text-muted-foreground hover:text-cyan-200 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 group/tool"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 shadow-[0_0_6px_rgba(6,182,212,0.8)] inline-block" />
                  <span>{t}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/tool:opacity-80 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills & Traits */}
        <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" /> Professional Traits
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                Core Competencies
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {softSkills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.a
                      key={i}
                      href={getGoogleSearchUrl(`what is ${skill.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Search "${skill.name}" on Google`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 rounded-2xl border text-sm font-semibold flex items-center gap-2 shadow-sm transition-transform cursor-pointer group/trait ${skill.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{skill.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/trait:opacity-80 transition-opacity" />
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent border border-primary/20 flex items-start gap-3.5 shadow-sm">
              <div className="p-2 rounded-xl bg-primary/20 text-primary shrink-0 mt-0.5">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-foreground font-bold text-sm block mb-0.5">
                  Driven by Curiosity &amp; Shipped Code
                </strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  As an emerging AI developer, every project is a live experiment. I learn by building, iterate fast, and deploy with purpose — turning ideas into real working software.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
