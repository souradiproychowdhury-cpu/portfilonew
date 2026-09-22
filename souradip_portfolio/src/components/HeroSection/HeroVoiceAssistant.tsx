import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, Sparkles } from "lucide-react";

interface HeroVoiceAssistantProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

export const HeroVoiceAssistant = ({ heroRef }: HeroVoiceAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const greetingText =
    "Welcome to Souradip's portfolio. I am a C.S.E. student and aspiring web developer, passionate with building modern, user-friendly websites and applications. I enjoy learning new technologies and turning creative ideas into practical digital solutions.";

  // Find a male voice
  const getMaleVoice = (): SpeechSynthesisVoice | null => {
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
  };

  const playGreeting = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(greetingText);
    const maleVoice = getMaleVoice();
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    // Deeper pitch for clear male voice
    utterance.pitch = 0.88;
    utterance.rate = 0.98;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setHasPlayed(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopGreeting = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopGreeting();
    } else {
      playGreeting();
    }
  };

  // Attempt auto-greeting on mount and first interaction
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    // Ensure voices are loaded
    const loadVoicesAndInit = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoicesAndInit();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoicesAndInit;
    }

    let started = false;

    const tryAutoPlay = () => {
      if (started) return;
      started = true;
      playGreeting();
    };

    // Try auto-play after short delay (some browsers allow it if site has been visited)
    const timer = setTimeout(() => {
      tryAutoPlay();
    }, 800);

    // Fallback: If browser blocks unprompted audio, play on first user interaction in window
    const handleFirstInteraction = () => {
      if (!started) {
        tryAutoPlay();
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // CRITICAL REQUIREMENT: Stop voice assistant as soon as user leaves the Hero section
  useEffect(() => {
    const heroElement = heroRef?.current || document.getElementById("hero");
    if (!heroElement || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If hero is less than 15% visible (user scrolled down to other sections), stop speaking immediately
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
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
    <div className="inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-full glass-panel border border-primary/30 shadow-md hover:border-primary/50 transition-all duration-300">
      <button
        onClick={togglePlayback}
        title={isPlaying ? "Mute Voice Assistant" : "Play Male Voice Greeting"}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isPlaying
            ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.6)] animate-pulse"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-white" />
        ) : hasPlayed ? (
          <RotateCcw className="w-3.5 h-3.5" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Voice Status & Waveform */}
      <div className="flex items-center gap-2 cursor-pointer select-none" onClick={togglePlayback}>
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-4">
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
              <span className="w-0.5 h-4 bg-primary rounded-full animate-[bounce_0.8s_infinite_250ms]" />
              <span className="w-0.5 h-2.5 bg-purple-400 rounded-full animate-[bounce_0.8s_infinite_400ms]" />
              <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_150ms]" />
            </div>
            <span className="text-xs font-bold text-primary tracking-tight">
              Voice Assistant Speaking...
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              {hasPlayed ? "Replay Voice Greeting (Male)" : "Play Voice Greeting (Male)"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
