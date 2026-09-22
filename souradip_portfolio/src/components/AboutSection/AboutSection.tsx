import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Code2, Globe2, Trophy, Zap, Award, ExternalLink, FileText, Download } from "lucide-react";

interface ScrollRevealParagraphProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const ScrollRevealParagraph = ({
  children,
  progress,
  range,
}: ScrollRevealParagraphProps) => {
  // Smoothly transitions from darker/dim to brighter as user scrolls down
  const opacity = useTransform(progress, range, [0.28, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(progress, range, ["brightness(0.6)", "brightness(1)"]);

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className="text-muted-foreground transition-all duration-200 will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.p>
  );
};

const stats = [
  { icon: <Code2 className="w-6 h-6" />, label: "Projects Shipped", value: "4+" },
  { icon: <Trophy className="w-6 h-6" />, label: "Hackathon Won", value: "2025" },
  { icon: <Globe2 className="w-6 h-6" />, label: "Live Deployments", value: "4" },
  { icon: <Zap className="w-6 h-6" />, label: "AI Projects Built", value: "3+" },
  {
    icon: <Award className="w-6 h-6" />,
    label: "Course Completed",
    value: "2",
    details: "Python for Everybody & Web Development Mastery (Coursera Certified)",
    isWide: true,
  },
];

export const AboutSection = () => {
  const bioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bioRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const progressHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col md:flex-row gap-16 items-start"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left: Bio with Scroll-Driven Darker to Brighter Transition */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Passionate about{" "}
              <span className="text-gradient-primary">AI &amp; Digital Innovation</span>
            </h2>
            
            {/* Scroll-driven text reveal container */}
            <div ref={bioRef} className="relative pl-5 border-l-2 border-primary/20 space-y-4 text-base md:text-lg leading-relaxed">
              {/* Dynamic scroll illumination line */}
              <motion.div
                className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-primary via-cyan-400 to-purple-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                style={{ height: progressHeight }}
              />

              <ScrollRevealParagraph progress={scrollYProgress} range={[0.05, 0.4]}>
                I'm <strong className="text-foreground font-bold">Souradip Roy Chowdhury</strong>, a Computer Science &amp; Engineering student at <strong className="text-foreground font-bold">Techno Institute of Engineering and Management</strong> (B.Tech, graduating 2028), based in Ashoknagar, West Bengal, India.
              </ScrollRevealParagraph>

              <ScrollRevealParagraph progress={scrollYProgress} range={[0.35, 0.7]}>
                Proficient in Python, Java, JavaScript, HTML, CSS and React.js, with hands-on experience developing AI-powered applications, healthcare platforms, chatbots, virtual companions, and 3D gesture interfaces.
              </ScrollRevealParagraph>

              <ScrollRevealParagraph progress={scrollYProgress} range={[0.65, 0.98]}>
                Passionate about solving real-world problems through software and crafting seamless, interactive digital experiences that bridge human intent and machine intelligence.
              </ScrollRevealParagraph>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {["AI & Web Development", "React · Python · Node", "Hackathon Winner 2025", "Gesture Interaction", "Computer Vision"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="pt-3">
            <a
              href="/Souradip_Roy_Chowdhury_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-primary/30 hover:border-cyan-400/60 text-foreground text-xs font-bold transition-all duration-200 hover:scale-105 shadow-sm group/resume"
            >
              <FileText className="w-4 h-4 text-cyan-400 group-hover/resume:scale-110 transition-transform" />
              <span>View Full Resume (PDF)</span>
              <Download className="w-3.5 h-3.5 text-muted-foreground group-hover/resume:text-cyan-300" />
            </a>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={`glass-panel p-6 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${
                stat.isWide ? "col-span-2 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]" : ""
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />

              {stat.isWide ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 w-full">
                  <div className="flex items-center gap-4">
                    <div className="text-cyan-400 p-3 bg-cyan-500/10 border border-cyan-500/25 rounded-xl shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <h3 className="text-3xl font-extrabold text-foreground">{stat.value}</h3>
                        <p className="text-sm font-bold text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                        {stat.details}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("courses");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        window.location.hash = "#courses";
                      }
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all duration-200 shrink-0 self-end sm:self-center cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>View Courses</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="text-primary mb-4 p-3 bg-primary/10 w-max rounded-xl">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
