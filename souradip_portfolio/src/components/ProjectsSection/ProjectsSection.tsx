import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(800);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically calculate the exact horizontal scroll distance needed for desktop
  useEffect(() => {
    if (isMobile) return;

    const updateDistance = () => {
      if (trackRef.current) {
        const track = trackRef.current;
        const lastCard = track.lastElementChild as HTMLElement;
        const windowWidth = window.innerWidth;
        if (lastCard) {
          const cardRightEdge = lastCard.offsetLeft + lastCard.offsetWidth;
          const rightMargin = 48;
          const dist = Math.max(0, cardRightEdge + rightMargin - windowWidth);
          setScrollDistance(dist);
        } else {
          const trackWidth = track.scrollWidth;
          const dist = Math.max(0, trackWidth - windowWidth + 48);
          setScrollDistance(dist);
        }
      }
    };

    updateDistance();
    const timer1 = setTimeout(updateDistance, 100);
    const timer2 = setTimeout(updateDistance, 400);
    window.addEventListener("resize", updateDistance);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateDistance);
    };
  }, [isMobile]);

  // Tracks vertical scroll through the pinned container on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const scrollToProject = (idx: number) => {
    if (!mobileTrackRef.current) return;
    const cards = mobileTrackRef.current.children;
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveMobileIdx(idx);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Mochi: AI Virtual Companion",
      subtitle: "Voice-driven AI companion inside an animated cat interface — Claude AI, camera analysis, weather, news & more.",
      tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "Claude API"],
      category: "AI ASSISTANT / VOICE",
      live: "https://souradiproychowdhury-cpu.github.io/mochi/",
      github: "https://github.com/souradiproychowdhury-cpu/mochi",
      image: "/project-mochi.png",
      accent: "#a855f7",
      accentLight: "rgba(168,85,247,0.15)",
    },
    {
      id: 2,
      title: "GestureAI: 3D Gesture Control",
      subtitle: "3D gesture control meets an intelligent Q&A engine powered by AI & Wikipedia.",
      tags: ["JavaScript", "Gesture Recognition", "AI/LLM APIs", "Wikipedia API"],
      category: "AI / 3D INTERACTION",
      live: "https://souradiproychowdhury-cpu.github.io/MotionMind./",
      github: "https://github.com/souradiproychowdhury-cpu/MotionMind.",
      image: "/project-gesture.png",
      accent: "#22d3ee",
      accentLight: "rgba(34,211,238,0.15)",
    },
    {
      id: 3,
      title: "VitaSense — Smart Healthcare Platform",
      subtitle: "Full-stack health platform with AI vitals analysis, medicine reminders, SOS & daily health signals.",
      tags: ["React", "Vite", "Node.js", "MongoDB", "Groq/Llama"],
      category: "FULL-STACK HEALTH / AI",
      live: "https://vita-sense-mxtycln7a-souradiproychowdhury-cpu.vercel.app/",
      github: "https://github.com/souradiproychowdhury-cpu/VitaSense",
      image: "/project-vitasense.png",
      accent: "#10b981",
      accentLight: "rgba(16,185,129,0.15)",
    },
    {
      id: 4,
      title: "Chatify — Real-Time Messaging UI",
      subtitle: "Modern real-time messaging interface with image sharing, voice messages & emoji reactions.",
      tags: ["HTML5", "CSS3", "Vanilla JavaScript"],
      category: "FRONTEND / MESSAGING UI",
      live: "https://chatify-px8p.onrender.com/",
      github: "https://github.com/souradiproychowdhury-cpu",
      image: "/project-chatify.png",
      accent: "#3b82f6",
      accentLight: "rgba(59,130,246,0.15)",
    },
  ];

  // ── MOBILE LAYOUT (No sticky pinning trap, zero gap before My Journey) ──
  if (isMobile) {
    return (
      <section id="projects" className="relative bg-transparent pt-12 pb-6 w-full">
        {/* Mobile Header */}
        <div className="px-5 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Projects</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selected <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Swipe left or tap arrows to explore all 4 projects.
          </p>
        </div>

        {/* Mobile Horizontal Snap Track */}
        <div
          ref={mobileTrackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const scrollLeft = el.scrollLeft;
            const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 280;
            const idx = Math.round(scrollLeft / cardWidth);
            setActiveMobileIdx(Math.min(Math.max(idx, 0), projects.length - 1));
          }}
          className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-3 pt-1 no-scrollbar touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center group flex flex-col rounded-3xl overflow-hidden border border-cyan-400/40 bg-black backdrop-blur-xl shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-44 bg-black shrink-0">
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border text-white shadow-sm"
                    style={{
                      background: project.accentLight,
                      borderColor: `${project.accent}55`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-black/70 border border-white/20 text-white/80 backdrop-blur-md">
                    0{project.id} / 04
                  </span>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-80"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 p-5 gap-3 bg-black justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-foreground tracking-tight mb-1 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{
                        background: project.accentLight,
                        borderColor: `${project.accent}44`,
                        color: project.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-border/40 my-0.5" />

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-95"
                    style={{ background: project.accent }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-foreground/15 text-foreground hover:bg-foreground/5 transition-all active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots & Arrow Controls */}
        <div className="flex items-center justify-between px-5 pt-2">
          <div className="flex items-center gap-1.5">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeMobileIdx === idx
                    ? "w-6 h-2 bg-gradient-to-r from-cyan-400 to-primary shadow-sm"
                    : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to project ${p.id}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToProject(Math.max(0, activeMobileIdx - 1))}
              disabled={activeMobileIdx === 0}
              className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-foreground disabled:opacity-30 disabled:pointer-events-none hover:bg-foreground/5 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              0{activeMobileIdx + 1} / 04
            </span>
            <button
              onClick={() => scrollToProject(Math.min(projects.length - 1, activeMobileIdx + 1))}
              disabled={activeMobileIdx === projects.length - 1}
              className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-foreground disabled:opacity-30 disabled:pointer-events-none hover:bg-foreground/5 active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP PINNED HORIZONTAL SCROLL LAYOUT ──
  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        height: `calc(100vh + ${scrollDistance}px)`,
      }}
      className="relative bg-transparent hidden md:block"
    >
      {/* Pinned viewport frame: pins while scrolling down through all 4 projects */}
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-14 md:pt-16 pb-4 overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-4 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Horizontal Flow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Selected <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 max-w-xl">
              Scroll down to slide across all 4 projects from left to right in one line. Continuing down moves directly into My Journey.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs text-muted-foreground font-mono hidden md:inline-block">
              Mochi → Chatify
            </span>
            <div className="w-36 md:w-44 h-2.5 rounded-full bg-neutral-900 border border-cyan-500/30 overflow-hidden relative shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full bg-gradient-to-r from-cyan-400 via-primary to-purple-500 origin-left"
              />
            </div>
          </div>
        </div>

        {/* All 4 projects in ONE single line moving horizontally */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex flex-row gap-6 pl-6 md:pl-16 pr-12 w-max items-stretch shrink-0"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-[85vw] max-w-[390px] sm:w-[390px] md:w-[430px] lg:w-[450px] shrink-0 group flex flex-col rounded-3xl overflow-hidden border border-cyan-400/40 bg-black backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)]"
              >
                {/* ── Image Section ── */}
                <div className="relative overflow-hidden h-48 md:h-56 bg-black shrink-0">
                  {/* Category badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border text-white shadow-sm"
                      style={{
                        background: project.accentLight,
                        borderColor: `${project.accent}55`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Project Number */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/70 border border-white/20 text-white/80 backdrop-blur-md">
                      0{project.id} / 04
                    </span>
                  </div>

                  {/* Screenshot Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 transform-gpu"
                  />

                  {/* Neon bottom glow line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-80"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                  />
                </div>

                {/* ── Content Section ── */}
                <div className="flex flex-col flex-1 p-6 md:p-7 gap-3.5 bg-black justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight mb-1.5 leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                        style={{
                          background: project.accentLight,
                          borderColor: `${project.accent}44`,
                          color: project.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/40 mt-1" />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md"
                      style={{ background: project.accent }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-foreground/15 text-foreground hover:bg-foreground/5 transition-all duration-200 active:scale-95"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
