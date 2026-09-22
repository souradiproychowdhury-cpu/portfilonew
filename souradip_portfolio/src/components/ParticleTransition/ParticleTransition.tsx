import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  speed: number;
  angle: number;
  angularVel: number;
  trail: Array<{ x: number; y: number }>;
  hue: number;
}

interface Props {
  onComplete?: () => void;
  duration?: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(w: number, h: number): Particle {
  const maxLife = rand(80, 200);
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-1.5, 1.5),
    vy: rand(-1.5, 1.5),
    life: rand(0, maxLife * 0.5),
    maxLife,
    size: rand(1, 2.5),
    speed: rand(0.4, 1.6),
    angle: rand(0, Math.PI * 2),
    angularVel: rand(-0.03, 0.03),
    trail: [],
    hue: rand(195, 225),
  };
}

export function ParticleTransition({ onComplete, duration = 3200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number>(0);

  const handleComplete = useCallback(() => {
    setPhase("done");
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 60;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    startTimeRef.current = Date.now();
    const FADE_START = duration * 0.6;

    function drawFrame() {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      let globalAlpha = 1;
      if (elapsed > FADE_START) {
        globalAlpha = 1 - (elapsed - FADE_START) / (duration - FADE_START);
        globalAlpha = Math.max(0, globalAlpha);
      }

      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.globalAlpha = globalAlpha;
      ctx!.fillStyle = "rgb(3, 4, 14)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life += 1;
        p.angle += p.angularVel;
        p.x += Math.cos(p.angle) * p.speed + p.vx * 0.2;
        p.y += Math.sin(p.angle) * p.speed + p.vy * 0.2;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        if (p.life > p.maxLife) {
          particles[i] = createParticle(canvas.width, canvas.height);
          particles[i].life = 0;
          return;
        }

        const lr = p.life / p.maxLife;
        const particleAlpha = Math.sin(lr * Math.PI);

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.shift();

        ctx!.save();

        if (p.trail.length > 2) {
          for (let t = 1; t < p.trail.length; t++) {
            const tp = t / p.trail.length;
            ctx!.globalAlpha = globalAlpha * tp * particleAlpha * 0.5;
            ctx!.beginPath();
            ctx!.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx!.lineTo(p.trail[t].x, p.trail[t].y);
            ctx!.strokeStyle = `hsl(${p.hue}, 90%, 65%)`;
            ctx!.lineWidth = p.size * tp;
            ctx!.lineCap = "round";
            ctx!.stroke();
          }
        }

        ctx!.globalAlpha = globalAlpha * particleAlpha;

        const glowR = p.size * 18;
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(0, `hsla(${p.hue}, 100%, 75%, 0.35)`);
        glow.addColorStop(0.35, `hsla(${p.hue}, 90%, 60%, 0.15)`);
        glow.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        const coreR = p.size * 4;
        const core = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, coreR);
        core.addColorStop(0, `hsla(${p.hue - 10}, 100%, 95%, 0.95)`);
        core.addColorStop(0.5, `hsla(${p.hue}, 100%, 70%, 0.6)`);
        core.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, coreR, 0, Math.PI * 2);
        ctx!.fillStyle = core;
        ctx!.fill();

        ctx!.restore();
      });

      const blobTime = elapsed * 0.0003;
      const blobs = [
        { bx: canvas.width * (0.2 + Math.sin(blobTime) * 0.1), by: canvas.height * (0.7 + Math.cos(blobTime * 0.7) * 0.1), r: 140, hue: 210 },
        { bx: canvas.width * (0.75 + Math.cos(blobTime * 0.9) * 0.08), by: canvas.height * (0.2 + Math.sin(blobTime * 1.1) * 0.08), r: 100, hue: 200 },
        { bx: canvas.width * (0.5 + Math.sin(blobTime * 0.6) * 0.15), by: canvas.height * (0.5 + Math.cos(blobTime * 0.8) * 0.12), r: 80, hue: 220 },
      ];
      blobs.forEach(({ bx, by, r, hue }) => {
        const bg = ctx!.createRadialGradient(bx, by, 0, bx, by, r);
        bg.addColorStop(0, `hsla(${hue}, 100%, 65%, ${0.05 * globalAlpha})`);
        bg.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
        ctx!.globalAlpha = 1;
        ctx!.beginPath();
        ctx!.arc(bx, by, r, 0, Math.PI * 2);
        ctx!.fillStyle = bg;
        ctx!.fill();
      });

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(drawFrame);
      } else {
        setPhase("fading");
        setTimeout(handleComplete, 400);
      }
    }

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [duration, handleComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
        transition: "opacity 0.4s ease-out",
        opacity: phase === "fading" ? 0 : 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
