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
      radius!: number;
      speedY!: number;
      angle!: number;
      angleSpeed!: number;
      opacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.radius = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.2 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update() {
        // Sun ray-like radial movement
        this.angle += this.angleSpeed;
        const rayLength = Math.sin(this.angle) * 5;
        
        this.x += Math.cos(this.angle) * 0.5;
        this.y -= this.speedY + rayLength * 0.1;

        if (this.y < -50 || this.x < -50 || this.x > (canvas?.offsetWidth || 800) + 50) {
          this.reset();
          this.y = (canvas?.offsetHeight || 600) + 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        
        gradient.addColorStop(0, `rgba(251, 146, 60, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(251, 146, 60, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      setCanvasSize();
      particles = [];
      const numParticles = Math.floor((canvas?.offsetWidth || 800) / 20);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

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
      style={{ opacity: 0.5 }}
      suppressHydrationWarning
    />
  );
}

