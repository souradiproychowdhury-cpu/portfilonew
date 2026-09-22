import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Code2, Trophy, Rocket, BookOpen, Briefcase } from "lucide-react";

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
      description:
        "Developed and deployed three major AI-powered projects: Mochi (an animated AI virtual companion with voice interaction and Claude AI), GestureAI/MotionMind (3D gesture control meets AI Q&A), and VitaSense (full-stack healthcare platform with Groq/Llama AI). Each project ships with live deployments and public GitHub repos.",
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
      description:
        "Built a modern real-time messaging interface from scratch using pure HTML, CSS and JavaScript — no frameworks. Supports text communication, image sharing, voice messages with a custom player, and emoji reactions. Live at chatify-px8p.onrender.com.",
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
    <div id="career" className="-mt-12 md:-mt-16 relative z-20 pt-2">
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
