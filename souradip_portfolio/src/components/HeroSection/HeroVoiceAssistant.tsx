import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, RotateCcw, Sparkles } from "lucide-react";

interface HeroVoiceAssistantProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

export const HeroVoiceAssistant = ({ heroRef }: HeroVoiceAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [supported, setSupported] = useState(true);
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

  const playGreeting = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    try {
      // Cancel previous speech to reset state
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    // Android & Chrome: small timeout ensures previous cancellation cleans up internal voice pipeline
    setTimeout(() => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const utterance = new SpeechSynthesisUtterance(greetingText);
      const maleVoice = getMaleVoice();
      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      // Voice settings: clear, natural cadence
      utterance.pitch = 0.88;
      utterance.rate = 0.98;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        hasSpokenRef.current = true;
        isPlayingRef.current = true;
        setIsPlaying(true);
        setHasPlayed(true);
      };

      utterance.onend = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        // If blocked by browser autoplay policy, allow user gesture to retry
        if (e.error === "not-allowed") {
          hasSpokenRef.current = false;
        }
      };

      utteranceRef.current = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    }, 25);
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

  // Attempt auto-greeting on mount and first interaction
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    // Ensure voices are loaded (especially for Android / Chrome async voice loading)
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Try auto-play after short delay (works on desktop / sites with engagement)
    const timer = setTimeout(() => {
      if (!hasSpokenRef.current) {
        playGreeting();
      }
    }, 700);

    // CRITICAL FOR VERCEL & ANDROID:
    // If the browser blocked unprompted autoplay, immediately trigger speech on the very first touch/click/scroll!
    const handleFirstGesture = () => {
      if (hasSpokenRef.current) return;

      // Resume speech synthesis inside user gesture
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {}

      playGreeting();
    };

    const gestureEvents = ["pointerdown", "touchstart", "touchend", "click", "keydown"] as const;
    const addGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
      });
    };
    addGestureListeners();

    return () => {
      clearTimeout(timer);
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
        // If hero is less than 15% visible (user scrolled down), stop speaking immediately
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
    <div
      onClick={togglePlayback}
      className={`inline-flex items-center gap-2 p-1.5 pr-3.5 sm:pr-4 rounded-full glass-panel border transition-all duration-300 cursor-pointer select-none max-w-full ${
        isPlaying
          ? "border-primary/70 shadow-[0_0_20px_rgba(139,92,246,0.35)] bg-primary/10"
          : !hasPlayed
          ? "border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:border-primary hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] animate-pulse"
          : "border-border/60 hover:border-primary/50 shadow-sm"
      }`}
    >
      <button
        type="button"
        title={isPlaying ? "Mute Voice Assistant" : "Play Male Voice Greeting"}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
          isPlaying
            ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.7)] animate-pulse"
            : "bg-primary/15 text-primary hover:bg-primary/25"
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        ) : hasPlayed ? (
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        ) : (
          <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
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
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold text-foreground/90 group-hover:text-primary transition-colors truncate">
              {hasPlayed ? "Replay Voice Intro" : "Tap for Voice Greeting"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
