import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroVoiceAssistantProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

export const HeroVoiceAssistant = ({ heroRef }: HeroVoiceAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [supported, setSupported] = useState(true);
  const [showPromptBanner, setShowPromptBanner] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasSpokenRef = useRef(false);
  const isPlayingRef = useRef(false);

  const greetingText =
    "Welcome to Souradip's portfolio. I am a C.S.E. student and aspiring web developer, passionate with building modern, user-friendly websites and applications. I enjoy learning new technologies and turning creative ideas into practical digital solutions.";

  // Find a male voice
  const getMaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Look for known English male voices
    const maleVoice = voices.find((v) => {
      const name = v.name.toLowerCase();
      const isEnglish = v.lang.startsWith("en");
      const isMale =
        name.includes("male") ||
        name.includes("david") ||
        name.includes("george") ||
        name.includes("daniel") ||
        name.includes("guy") ||
        name.includes("mark") ||
        name.includes("james") ||
        name.includes("rishi") ||
        name.includes("ravi") ||
        name.includes("google uk english male") ||
        name.includes("natural (male)");
      const isFemale =
        name.includes("female") ||
        name.includes("zira") ||
        name.includes("susan") ||
        name.includes("eva") ||
        name.includes("samantha") ||
        name.includes("victoria");
      return isEnglish && isMale && !isFemale;
    });

    if (maleVoice) return maleVoice;

    // Fallback to any English voice
    const englishVoice = voices.find((v) => v.lang.startsWith("en"));
    return englishVoice || voices[0];
  }, []);

  // SYNCHRONOUS speech trigger: must not use setTimeout to preserve browser user activation token
  const playGreeting = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    try {
      // Unlock Web Audio context synchronously on user gesture
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioCtx.resume().then(() => audioCtx.close()).catch(() => {});
      }
    } catch {}

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    const utterance = new SpeechSynthesisUtterance(greetingText);
    utterance.lang = "en-US";
    const maleVoice = getMaleVoice();
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    // Voice settings: clear, natural male cadence
    utterance.pitch = 0.88;
    utterance.rate = 0.98;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      hasSpokenRef.current = true;
      isPlayingRef.current = true;
      setIsPlaying(true);
      setHasPlayed(true);
      setShowPromptBanner(false);
    };

    utterance.onend = () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      // If browser blocked unprompted autoplay ('not-allowed'), show banner so user can tap
      if (e.error === "not-allowed") {
        hasSpokenRef.current = false;
        setShowPromptBanner(true);
      }
    };

    utteranceRef.current = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  }, [greetingText, getMaleVoice]);

  const stopGreeting = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopGreeting();
    } else {
      playGreeting();
    }
  }, [isPlaying, playGreeting, stopGreeting]);

  // Attempt auto-greeting on mount and first user gesture
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    // Load voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // 1. Try immediate unprompted play on mount (works on localhost or sites with high engagement)
    playGreeting();

    // 2. Check after 900ms: If browser blocked unprompted play (like Vercel HTTPS on phones), show welcome banner
    const bannerTimer = setTimeout(() => {
      if (!hasSpokenRef.current && !isPlayingRef.current) {
        setShowPromptBanner(true);
      }
    }, 900);

    // 3. User interaction fallback: SYNCHRONOUSLY trigger speech on first gesture anywhere on screen
    const handleFirstGesture = () => {
      if (hasSpokenRef.current || isPlayingRef.current) return;
      playGreeting();
    };

    const gestureEvents = ["pointerdown", "touchstart", "touchend", "click", "keydown"] as const;
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
    });

    return () => {
      clearTimeout(bannerTimer);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, [playGreeting]);

  // Stop voice assistant as soon as user leaves the Hero section
  useEffect(() => {
    const heroElement = heroRef?.current || document.getElementById("hero");
    if (!heroElement || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            try {
              window.speechSynthesis.cancel();
            } catch {}
            isPlayingRef.current = false;
            setIsPlaying(false);
          }
        }
      },
      { threshold: [0, 0.15, 0.5] }
    );

    observer.observe(heroElement);
    return () => {
      observer.disconnect();
    };
  }, [heroRef]);

  if (!supported) return null;

  return (
    <>
      {/* Floating Welcome Sound Prompt (Auto-appears on Vercel/mobile if autoplay is restricted) */}
      <AnimatePresence>
        {showPromptBanner && !hasPlayed && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              playGreeting();
            }}
            className="fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-400/60 bg-black/90 shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all text-left"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-xs font-bold text-foreground">
              🔊 <span className="text-cyan-300">Tap anywhere</span> to hear welcome voice
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPromptBanner(false);
              }}
              className="text-muted-foreground hover:text-foreground text-xs ml-1 px-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Voice Assistant Pill */}
      <div
        onClick={togglePlayback}
        className={`inline-flex items-center gap-2 p-1.5 pr-3.5 sm:pr-4 rounded-full glass-panel border transition-all duration-300 cursor-pointer select-none max-w-full ${
          isPlaying
            ? "border-primary/70 shadow-[0_0_20px_rgba(139,92,246,0.35)] bg-primary/10"
            : !hasPlayed
            ? "border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-pulse bg-cyan-500/10"
            : "border-border/60 hover:border-primary/50 shadow-sm"
        }`}
      >
        <button
          type="button"
          title={isPlaying ? "Mute Voice Assistant" : "Play Male Voice Greeting"}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isPlaying
              ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.7)] animate-pulse"
              : !hasPlayed
              ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.7)]"
              : "bg-primary/15 text-primary hover:bg-primary/25"
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          ) : hasPlayed ? (
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black animate-bounce" />
          )}
        </button>

        {/* Voice Status & Waveform */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
          {isPlaying ? (
            <>
              <div className="flex items-center gap-0.5 h-3.5 sm:h-4 shrink-0">
                <span className="w-0.5 h-2.5 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
                <span className="w-0.5 h-3.5 bg-primary rounded-full animate-[bounce_0.8s_infinite_250ms]" />
                <span className="w-0.5 h-2 bg-purple-400 rounded-full animate-[bounce_0.8s_infinite_400ms]" />
                <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_150ms]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-primary tracking-tight truncate">
                Speaking Welcome Intro...
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-foreground hover:text-primary transition-colors truncate">
                {hasPlayed ? "Replay Voice Intro" : "Tap for Welcome Voice"}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

