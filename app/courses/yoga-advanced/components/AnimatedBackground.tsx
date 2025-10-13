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
    let energyFlows: EnergyFlow[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class EnergyFlow {
      x!: number;
      y!: number;
      radius!: number;
      speedY!: number;
      flowPhase!: number;
      flowSpeed!: number;
      opacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.offsetWidth || 800);
        this.y = Math.random() * (canvas?.offsetHeight || 600);
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.4 + 0.2;
        this.flowPhase = Math.random() * Math.PI * 2;
        this.flowSpeed = Math.random() * 0.03 + 0.02;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y -= this.speedY;
        this.flowPhase += this.flowSpeed;
        
        // Wave-like energy flow
        this.x += Math.sin(this.flowPhase) * 2;

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
        
        gradient.addColorStop(0, `rgba(249, 115, 22, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(251, 191, 36, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(249, 115, 22, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      setCanvasSize();
      energyFlows = [];
      const numFlows = Math.floor((canvas?.offsetWidth || 800) / 20);
      for (let i = 0; i < numFlows; i++) {
        energyFlows.push(new EnergyFlow());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      energyFlows.forEach(flow => {
        flow.update();
        flow.draw();
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
    />
  );
}

