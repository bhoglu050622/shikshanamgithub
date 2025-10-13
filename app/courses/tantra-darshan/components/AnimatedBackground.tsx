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
    let yantras: Yantra[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Yantra {
      x!: number;
      y!: number;
      size!: number;
      rotation!: number;
      rotationSpeed!: number;
      spiralPhase!: number;
      spiralSpeed!: number;
      opacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.size = Math.random() * 30 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.spiralPhase = 0;
        this.spiralSpeed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.spiralPhase += this.spiralSpeed;
        
        // Energy spiral movement
        this.x += Math.cos(this.spiralPhase) * 0.5;
        this.y += Math.sin(this.spiralPhase) * 0.5 - 0.2;

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

        // Draw yantra-like geometric pattern
        ctx.strokeStyle = `rgba(220, 38, 38, ${this.opacity})`;
        ctx.lineWidth = 2;

        // Central triangle pointing up
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.closePath();
        ctx.stroke();

        // Inverted triangle
        ctx.strokeStyle = `rgba(124, 58, 237, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, this.size / 2);
        ctx.lineTo(-this.size / 2, -this.size / 2);
        ctx.lineTo(this.size / 2, -this.size / 2);
        ctx.closePath();
        ctx.stroke();

        // Outer circle
        ctx.strokeStyle = `rgba(220, 38, 38, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }
    }

    const init = () => {
      setCanvasSize();
      yantras = [];
      const numYantras = Math.floor((canvas?.offsetWidth || 800) / 60);
      for (let i = 0; i < numYantras; i++) {
        yantras.push(new Yantra());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      yantras.forEach(yantra => {
        yantra.update();
        yantra.draw();
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
      style={{ opacity: 0.3 }}
    />
  );
}

