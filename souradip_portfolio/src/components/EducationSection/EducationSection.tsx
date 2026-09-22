import SkillCategory from "./SkillCategory";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, Building2, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

export const EducationSection = () => {
  const certifications = [
    {
      title: "Python for Everybody",
      fullName: "Programming for Everybody (Getting Started with Python)",
      issuer: "University of Michigan (Coursera)",
      credentialId: "ID1IDDFXD7T2",
      verifyUrl: "https://coursera.org/verify/ID1IDDFXD7T2",
      certificateImage: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~ID1IDDFXD7T2/CERTIFICATE_LANDING_PAGE~ID1IDDFXD7T2.jpeg",
      description: "Mastered fundamental Python programming principles, algorithmic logic, functions, loops, and data structures.",
      tags: ["Python", "Algorithms", "Data Structures", "APIs"],
    },
    {
      title: "Web Development Mastery",
      fullName: "Web Development Mastery: HTML, CSS & JavaScript Fundamentals",
      issuer: "Board Infinity (Coursera)",
      credentialId: "M251FUAFMRT7",
      verifyUrl: "https://coursera.org/verify/M251FUAFMRT7",
      certificateImage: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~M251FUAFMRT7/CERTIFICATE_LANDING_PAGE~M251FUAFMRT7.jpeg",
      description: "Comprehensive front-end engineering covering modern HTML5 semantics, advanced CSS3 responsive layouts, and asynchronous JavaScript.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    },
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      school: "Techno Institute of Engineering and Management",
      year: "2024 – 2028",
      badge: "Hackathon Winner",
      badgeIcon: Award,
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      icon: GraduationCap,
      details: [
        "Specializing in Artificial Intelligence, Full-Stack Web Development, and Interactive Computing",
        "Won internal college hackathon in 2025 — built working prototype under tight deadline",
        "Coursework: Data Structures & Algorithms, Web Technologies, AI/ML, OOP, DBMS, Software Engineering",
        "Shipped 4 production-grade projects during studies: Mochi, GestureAI, VitaSense, Chatify"
      ]
    },
    {
      degree: "Higher Secondary (12th) — Science Stream",
      school: "West Bengal Board (WBCHSE)",
      year: "2022 – 2024",
      badge: "Science Scholar",
      badgeIcon: Sparkles,
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      icon: BookOpen,
      details: [
        "Completed 12th grade with Physics, Chemistry, Mathematics and Computer Science",
        "Developed early interest in programming and web development",
        "Built foundational skills in problem-solving and algorithmic thinking",
        "Prepared rigorously for engineering entrance examinations"
      ]
    }
  ];

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-24 space-y-20">
      
      {/* Education Header & Cards */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Academic <span className="text-gradient-primary">Background</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Building the theoretical foundation and practical skills that power innovative engineering and AI development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => {
            const DegreeIcon = edu.icon;
            const BadgeIcon = edu.badgeIcon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <MagicCard
                  className="h-full p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl"
                  gradientSize={300}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Header with Icon and Distinction Badge */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-sm">
                          <DegreeIcon className="w-7 h-7 text-primary" />
                        </div>
                        <span className={`px-3.5 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${edu.badgeColor}`}>
                          <BadgeIcon className="w-3.5 h-3.5" />
                          {edu.badge}
                        </span>
                      </div>

                      {/* Degree Title & Institution Meta */}
                      <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
                        {edu.degree}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground mb-6 pb-4 border-b border-border/60">
                        <span className="flex items-center gap-1.5 text-foreground font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-primary" /> {edu.school}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 font-mono text-primary font-bold">
                          <Calendar className="w-3.5 h-3.5" /> {edu.year}
                        </span>
                      </div>

                      {/* Key Highlights List */}
                      <ul className="space-y-3.5">
                        {edu.details.map((detail, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/90 font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Verified Online Certifications & Courses */}
      <div id="courses" className="scroll-mt-28 relative">
        <div id="featured-courses" className="scroll-mt-28" />
        <div id="certifications" className="scroll-mt-28" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
                  Verified Certifications &amp; Courses
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Industry-recognized coursework completed on Coursera
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              2 VERIFIED CREDENTIALS
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="h-full p-7 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl flex flex-col justify-between overflow-hidden"
                gradientSize={280}
                gradientColor="rgba(6, 182, 212, 0.12)"
                gradientFrom="#06b6d4"
                gradientTo="#8b5cf6"
              >
                <div className="space-y-4">
                  {/* Certificate preview image */}
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden border border-border/70 group/img shadow-md hover:border-primary/50 transition-all bg-background/50"
                  >
                    <img
                      src={cert.certificateImage}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]">
                      <ExternalLink className="w-4 h-4 text-cyan-300" />
                      <span>View Coursera Certificate</span>
                    </div>
                  </a>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {cert.issuer}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-foreground/5 border border-foreground/10 text-muted-foreground font-mono">
                      ID: {cert.credentialId}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-extrabold text-foreground tracking-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                      {cert.fullName}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-border/60 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Coursera Verified
                  </span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise & Skills Component */}
      <div>
        <SkillCategory />
      </div>

    </section>
  );
};
