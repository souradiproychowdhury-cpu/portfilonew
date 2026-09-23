import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Code2, Trophy, Rocket, BookOpen, Briefcase, ExternalLink } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "2028 — Target",
      title: "B.Tech Graduation",
      subtitle: "Techno Institute of Engineering and Management",
      description:
        "Expected to graduate with a B.Tech degree in Computer Science & Engineering. Focusing on AI, full-stack development, and interactive computing throughout the degree. Aiming to ship production-grade projects and contribute to open-source during studies.",
      icon: <BookOpen className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2025 — Present",
      title: "AI Project Streak: Mochi, GestureAI & VitaSense",
      subtitle: "Personal Projects",
      description: (
        <div>
          <p className="leading-relaxed">
            Developed and deployed three major AI-powered projects: Mochi (an animated AI virtual companion with voice interaction and Claude AI), GestureAI/MotionMind (3D gesture control meets AI Q&A), and VitaSense (full-stack healthcare platform with Groq/Llama AI). Each project ships with live deployments and public GitHub repos.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-border/30">
            <a
              href="https://souradiproychowdhury-cpu.github.io/mochi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-purple-300 bg-purple-950/70 border border-purple-500/40 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
            >
              <span>Mochi Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://souradiproychowdhury-cpu.github.io/MotionMind./"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 hover:bg-cyan-600 hover:text-white transition-all shadow-sm"
            >
              <span>GestureAI Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://vita-sense-mxtycln7a-souradiproychowdhury-cpu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <span>VitaSense Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ),
      icon: <Rocket className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2025",
      title: "Internal Hackathon Winner 🏆",
      subtitle: "Techno Institute of Engineering and Management",
      description:
        "Won an internal hackathon by turning an idea into a working solution under a tight deadline. Demonstrated creative problem framing under real-time constraints, scoping a feasible solution, building a functional prototype, and demoing effectively against strong peers.",
      icon: <Trophy className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2025",
      title: "Chatify — Real-Time Messaging UI",
      subtitle: "Personal Project",
      description: (
        <div>
          <p className="leading-relaxed">
            Built a modern real-time messaging interface from scratch using pure HTML, CSS and JavaScript — no frameworks. Supports text communication, image sharing, voice messages with a custom player, and emoji reactions.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-border/30">
            <a
              href="https://chatify-px8p.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-sky-300 bg-sky-950/70 border border-sky-500/40 hover:bg-sky-600 hover:text-white transition-all shadow-sm"
            >
              <span>Chatify Live Deployment</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ),
      icon: <Code2 className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2024 — Present",
      title: "B.Tech in Computer Science & Engineering",
      subtitle: "Techno Institute of Engineering and Management, Ashoknagar, West Bengal",
      description:
        "Started pursuing a B.Tech in CSE with coursework in Data Structures & Algorithms, Web Technologies, Artificial Intelligence, Object-Oriented Programming, Database Management Systems, and Software Engineering. Available for internships, freelance projects, and collaborations.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career" className="relative z-20 pt-4 md:-mt-16">
      <ScrollTimeline
        events={careerEvents}
        title="My Journey"
        subtitle="From student to AI developer — building, shipping and learning"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
