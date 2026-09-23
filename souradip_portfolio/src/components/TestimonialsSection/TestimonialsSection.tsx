import { motion } from "framer-motion";
import { ExternalLink, Github, Trophy } from "lucide-react";

const featuredProjects = [
  {
    name: "Mochi",
    desc: "AI Virtual Companion",
    live: "https://souradiproychowdhury-cpu.github.io/mochi/",
    github: "https://github.com/souradiproychowdhury-cpu/mochi",
    tags: ["Claude AI", "Voice", "Camera"],
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    name: "GestureAI",
    desc: "3D Gesture Control + Q&A",
    live: "https://souradiproychowdhury-cpu.github.io/MotionMind./",
    github: "https://github.com/souradiproychowdhury-cpu/MotionMind.",
    tags: ["Gesture", "AI Q&A", "3D"],
    color: "from-cyan-500/20 to-sky-500/20",
  },
  {
    name: "VitaSense",
    desc: "AI Healthcare Platform",
    live: "https://vita-sense-mxtycln7a-souradiproychowdhury-cpu.vercel.app/",
    github: "https://github.com/souradiproychowdhury-cpu/VitaSense",
    tags: ["React", "Groq/Llama", "Health"],
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Chatify",
    desc: "Real-Time Messaging UI",
    live: "https://chatify-px8p.onrender.com/",
    github: "https://github.com/souradiproychowdhury-cpu",
    tags: ["HTML5", "CSS3", "JavaScript"],
    color: "from-blue-500/20 to-sky-500/20",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <div id="featured" className="scroll-mt-24" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Featured <span className="text-gradient-primary">Projects &amp; Achievements</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hackathon achievements, live project deployments, and open-source contributions.
        </p>
      </motion.div>

      {/* Hackathon Winner Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-6 rounded-3xl glass-panel border border-amber-500/30 flex flex-col md:flex-row items-center gap-5 shadow-xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Trophy className="w-7 h-7 text-amber-400" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-extrabold text-foreground mb-1">🏆 Hackathon Winner — 2025</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Won an internal hackathon at Techno Institute of Engineering and Management in 2025. Turned a raw idea into a working prototype under a tight deadline — demonstrating real-world problem framing, fast execution, and live demo skills.
          </p>
        </div>
      </motion.div>

      {/* Project Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-panel p-6 rounded-3xl border border-foreground/10 flex flex-col relative overflow-hidden group hover:border-primary/40 transition-colors duration-500"
          >
            {/* Glow orb */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${project.color} rounded-full blur-[50px] group-hover:opacity-150 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 flex-1">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 group/link hover:text-primary transition-colors mb-1"
              >
                <h3 className="text-xl font-extrabold text-foreground group-hover/link:text-primary transition-colors">
                  {project.name}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-60 group-hover/link:opacity-100" />
              </a>
              <p className="text-muted-foreground text-xs mb-3">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 border border-primary/20 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-2 mt-auto pt-2 border-t border-border/30">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground text-xs font-bold hover:brightness-110 transition-all shadow-md active:scale-95 group/btn"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Live Deployment</span>
                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl glass-panel border border-foreground/10 text-foreground text-xs font-bold hover:border-primary/30 transition-colors active:scale-95"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Profile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <a
          href="https://github.com/souradiproychowdhury-cpu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-foreground/10 hover:border-primary/40 text-foreground font-bold text-lg transition-all hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
        >
          <Github className="w-6 h-6" />
          View All Projects on GitHub
          <ExternalLink className="w-5 h-5 text-primary" />
        </a>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
