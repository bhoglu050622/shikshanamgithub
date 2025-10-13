'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Particle {
      x!: number;
      y!: number;
      pairX!: number;
      pairY!: number;
      radius!: number;
      opacity!: number;
      mergePhase!: number;
      mergeSpeed!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.pairX = this.x + (Math.random() - 0.5) * 100;
        this.pairY = this.y + (Math.random() - 0.5) * 100;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.mergePhase = Math.random() * Math.PI * 2;
        this.mergeSpeed = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.mergePhase += this.mergeSpeed;
        
        // Merging wave effect - particles move towards and away from each other
        const mergeFactor = (Math.sin(this.mergePhase) + 1) / 2;
        const currentX = this.x + (this.pairX - this.x) * mergeFactor;
        const currentY = this.y + (this.pairY - this.y) * mergeFactor;
        
        // Slow drift
        this.x += (Math.random() - 0.5) * 0.1;
        this.y += (Math.random() - 0.5) * 0.1;
        this.pairX += (Math.random() - 0.5) * 0.1;
        this.pairY += (Math.random() - 0.5) * 0.1;

        // Keep in bounds
        if (this.x < -50 || this.x > (canvas?.offsetWidth || 800) + 50 ||
            this.y < -50 || this.y > (canvas?.offsetHeight || 600) + 50) {
          this.reset();
        }

        return { x: currentX, y: currentY };
      }

      draw() {
        if (!ctx) return;
        
        const pos = this.update();
        const gradient = ctx.createRadialGradient(
          pos.x, pos.y, 0,
          pos.x, pos.y, this.radius * 3
        );
        
        gradient.addColorStop(0, `rgba(20, 184, 166, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(20, 184, 166, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      setCanvasSize();
      particles = [];
      const numParticles = Math.floor((canvas?.offsetWidth || 800) / 25);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => particle.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      init();
      animate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
      suppressHydrationWarning
    />
  );
}

