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
    let scrolls: Scroll[] = [];

    // Sanskrit shlokas for animation
    const sanskritWords = ['राज', 'नीति', 'अर्थ', 'धर्म', 'काम', 'मोक्ष', 'सुख', 'दुःख', 'कूट', 'साम'];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Scroll {
      x!: number;
      y!: number;
      text!: string;
      speedY!: number;
      speedX!: number;
      opacity!: number;
      rotation!: number;
      size!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.text = sanskritWords[Math.floor(Math.random() * sanskritWords.length)];
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.rotation = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 12 + 16;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -50 || this.x < -50 || this.x > (canvas?.offsetWidth || 800) + 50) {
          this.reset();
          this.y = (canvas?.offsetHeight || 600) + 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px 'Noto Sans Devanagari', sans-serif`;
        ctx.fillStyle = `rgba(217, 119, 6, ${this.opacity})`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    const init = () => {
      setCanvasSize();
      scrolls = [];
      const numScrolls = Math.floor((canvas?.offsetWidth || 800) / 30);
      for (let i = 0; i < numScrolls; i++) {
        scrolls.push(new Scroll());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      scrolls.forEach(scroll => {
        scroll.update();
        scroll.draw();
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
