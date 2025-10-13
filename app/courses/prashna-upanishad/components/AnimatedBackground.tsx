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
    let stars: Star[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Star {
      x!: number;
      y!: number;
      radius!: number;
      twinklePhase!: number;
      twinkleSpeed!: number;
      opacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.radius = Math.random() * 1.5 + 0.5;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.twinklePhase += this.twinkleSpeed;
      }

      draw() {
        if (!ctx) return;
        
        const twinkle = (Math.sin(this.twinklePhase) + 1) / 2;
        const currentOpacity = this.opacity * twinkle;
        
        // Draw star with glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );
        
        gradient.addColorStop(0, `rgba(229, 231, 235, ${currentOpacity})`);
        gradient.addColorStop(0.3, `rgba(30, 64, 175, ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(30, 64, 175, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      setCanvasSize();
      stars = [];
      const numStars = Math.floor((canvas?.offsetWidth || 800) / 10);
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update();
        star.draw();
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
      style={{ opacity: 0.6 }}
    />
  );
}

