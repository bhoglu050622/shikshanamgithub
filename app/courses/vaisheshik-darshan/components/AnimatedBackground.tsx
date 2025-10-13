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
    let atoms: Atom[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Atom {
      x!: number;
      y!: number;
      radius!: number;
      speedY!: number;
      speedX!: number;
      opacity!: number;
      electrons!: Array<{ angle: number; speed: number }>;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.radius = Math.random() * 3 + 2;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.electrons = [
          { angle: 0, speed: 0.03 },
          { angle: Math.PI, speed: 0.03 }
        ];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        this.electrons.forEach(e => e.angle += e.speed);

        if (this.y < -50 || this.x < -50 || this.x > (canvas?.offsetWidth || 800) + 50) {
          this.reset();
          this.y = (canvas?.offsetHeight || 600) + 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Draw nucleus
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, ${this.opacity * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw electron orbits
        ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.stroke();

        // Draw electrons
        this.electrons.forEach(electron => {
          const ex = this.x + Math.cos(electron.angle) * this.radius * 4;
          const ey = this.y + Math.sin(electron.angle) * this.radius * 4;
          
          ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(ex, ey, this.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    const init = () => {
      setCanvasSize();
      atoms = [];
      const numAtoms = Math.floor((canvas?.offsetWidth || 800) / 50);
      for (let i = 0; i < numAtoms; i++) {
        atoms.push(new Atom());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      atoms.forEach(atom => {
        atom.update();
        atom.draw();
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
      style={{ opacity: 0.4 }}
      suppressHydrationWarning
    />
  );
}

