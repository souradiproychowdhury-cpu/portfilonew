import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Lightbulb } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

const services = [
  {
    icon: Cpu,
    title: "AI-Powered Applications",
    description: "Building intelligent apps that integrate LLMs (Claude, Groq/Llama), real-time AI processing, voice interaction and smart automation. From chatbots to health analytics — AI is the core.",
  },
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description: "End-to-end web applications using React, Node.js, MongoDB and Vite. Clean architecture, fast APIs, real-time features and production-ready deployments on Vercel and Render.",
  },
  {
    icon: Globe,
    title: "Interactive UI & Frontend Engineering",
    description: "Crafting visually stunning and highly interactive user interfaces with smooth animations, gesture control, 3D interactions and modern design systems. No frameworks needed — just excellent code.",
  },
  {
    icon: Lightbulb,
    title: "Rapid Prototyping & Hackathon Projects",
    description: "Turning ideas into working software under pressure. Skilled at scoping a feasible solution quickly, building functional MVPs and demoing impact. Hackathon winner with proven execution speed.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary">
          What I Build
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          From AI companions to full-stack health platforms — I build software that's intelligent, interactive, and shipped to production.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <MagicCard
                className="h-full p-8 rounded-[2rem] border border-border/80 bg-card/80"
                gradientSize={280}
                gradientColor="rgba(139, 92, 246, 0.12)"
                gradientFrom="#8b5cf6"
                gradientTo="#38bdf8"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
