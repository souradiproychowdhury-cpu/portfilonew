import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants, type MotionProps } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useLenis } from "lenis/react";

import { ThemeToggle } from "../lightswind/theme-toggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id);
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants: Variants = {
    open: {
      clipPath: "circle(1500px at 90% 5%)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(0px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-3 sm:top-5 md:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
        >
          <div className="glass-panel w-full max-w-7xl rounded-[1.75rem] sm:rounded-[2rem] flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 shadow-xl">
            {/* Logo */}
            <a
              onClick={() => handleScrollTo("#hero")}
              className="cursor-pointer font-extrabold text-lg flex items-center gap-2.5 sm:gap-3 group select-none shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-[11px] sm:text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                    SR
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-foreground text-xs sm:text-sm leading-none group-hover:text-primary transition-colors">
                  <span className="hidden xs:inline">Souradip Roy Chowdhury</span>
                  <span className="xs:hidden">Souradip R.</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <motion.li key={item.name} className="relative group text-sm font-medium text-muted-foreground transition-colors">
                    <a onClick={() => handleScrollTo(item.href)} className="cursor-pointer hover:text-foreground">
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary/80 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/Souradip_Roy_Chowdhury_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-105 shadow-sm"
              >
                <span>Resume</span>
                <Download className="w-3.5 h-3.5" />
              </a>
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-foreground hover:text-primary transition-colors p-1.5 rounded-lg border border-border/40 hover:bg-foreground/5"
                aria-label="Open mobile menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                {...({
                  initial: "closed",
                  animate: "open",
                  exit: "closed",
                  variants: menuVariants,
                } as MotionProps)}
                className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-6 overflow-y-auto"
              >
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-foreground p-2 rounded-full border border-border/50 hover:bg-foreground/5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Close mobile menu"
                >
                  <X size={26} />
                </motion.button>

                <motion.ul
                  {...({ variants: listVariants } as MotionProps)}
                  className="flex flex-col items-center justify-center w-full my-auto space-y-6 sm:space-y-8 py-8"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.name} {...({ variants: itemVariants } as MotionProps)}>
                      <a
                        onClick={() => handleScrollTo(item.href)}
                        className="text-2xl sm:text-3xl font-extrabold text-muted-foreground hover:text-primary hover:tracking-wide transition-all cursor-pointer block text-center"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li {...({ variants: itemVariants } as MotionProps)} className="pt-2">
                    <a
                      href="/Souradip_Roy_Chowdhury_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-5 py-2.5 rounded-full text-base font-bold bg-primary text-primary-foreground flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/30"
                    >
                      <span>Resume (PDF)</span>
                      <Download className="w-4 h-4" />
                    </a>
                  </motion.li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
