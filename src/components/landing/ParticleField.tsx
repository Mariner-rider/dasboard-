import { useEffect, useRef } from "react";

/**
 * Canvas particle field for the CTA section.
 * Particles drift and connect, slowly organizing into a soft Rivinity symbol.
 */
export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; target: number; pulse: number }[] = [];
    const attractors: { x: number; y: number }[] = [];

    const buildAttractors = (cx: number, cy: number, scale: number) => {
      attractors.length = 0;
      // Outer abstract infinity / R shape
      for (let i = 0; i < 60; i++) {
        const t = (i / 60) * Math.PI * 2;
        const x = cx + Math.cos(t) * scale * (1 + 0.35 * Math.sin(t * 2));
        const y = cy + Math.sin(t) * scale * 0.55 + Math.cos(t * 3) * scale * 0.12;
        attractors.push({ x, y });
      }
      // Inner detail loop
      for (let i = 0; i < 24; i++) {
        const t = (i / 24) * Math.PI * 2;
        const x = cx + Math.cos(t) * scale * 0.45;
        const y = cy + Math.sin(t) * scale * 0.25;
        attractors.push({ x, y });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles.length = 0;
      const count = Math.min(240, Math.floor((width * height) / 5000));
      buildAttractors(width / 2, height / 2, Math.min(width, height) * 0.32);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.4 + 0.7,
          target: Math.floor(Math.random() * attractors.length),
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const baseColor = "255, 255, 255";

      particles.forEach((p) => {
        const target = attractors[p.target % attractors.length];
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const pull = 0.0018;
        p.vx += dx * pull + (Math.random() - 0.5) * 0.02;
        p.vy += dy * pull + (Math.random() - 0.5) * 0.02;
        p.vx *= 0.955;
        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
      });

      // Draw connections
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${baseColor}, ${0.16 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
          }
        }
      }
      ctx.stroke();

      // Draw particles with soft glow
      particles.forEach((p) => {
        const alpha = 0.45 + Math.sin(p.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.fill();

        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor}, 0.06)`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleField;
