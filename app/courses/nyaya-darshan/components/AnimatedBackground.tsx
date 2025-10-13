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
    let particles: GeometricShape[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class GeometricShape {
      x!: number;
      y!: number;
      size!: number;
      rotation!: number;
      rotationSpeed!: number;
      speedY!: number;
      opacity!: number;
      shape!: 'triangle' | 'square' | 'circle';

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.size = Math.random() * 20 + 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.opacity = Math.random() * 0.3 + 0.1;
        const shapes: Array<'triangle' | 'square' | 'circle'> = ['triangle', 'square', 'circle'];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
      }

      update() {
        this.y -= this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y < -50) {
          this.reset();
          this.y = (canvas?.offsetHeight || 600) + 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = `rgba(37, 99, 235, ${this.opacity})`;
        ctx.lineWidth = 2;

        if (this.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(-this.size / 2, this.size / 2);
          ctx.lineTo(this.size / 2, this.size / 2);
          ctx.closePath();
          ctx.stroke();
        } else if (this.shape === 'square') {
          ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    const init = () => {
      setCanvasSize();
      particles = [];
      const numParticles = Math.floor((canvas?.offsetWidth || 800) / 40);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new GeometricShape());
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
      style={{ opacity: 0.3 }}
      suppressHydrationWarning
    />
  );
}

