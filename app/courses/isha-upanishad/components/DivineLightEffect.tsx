'use client';

import { useEffect, useRef } from 'react';

export default function DivineLightEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawRay = (angle: number, length: number, opacity: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      const gradient = ctx.createLinearGradient(0, 0, length, 0);
      gradient.addColorStop(0, `rgba(251, 191, 36, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(251, 146, 60, ${opacity * 0.6})`);
      gradient.addColorStop(1, 'rgba(251, 146, 60, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(length, -2);
      ctx.lineTo(length, 2);
      ctx.lineTo(0, 20);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numRays = 12;
      const maxLength = Math.max(canvas.width, canvas.height) * 0.6;

      for (let i = 0; i < numRays; i++) {
        const angle = (rotation + (i * 2 * Math.PI) / numRays);
        const pulseOpacity = 0.15 + Math.sin(rotation * 2 + i) * 0.05;
        drawRay(angle, maxLength, pulseOpacity);
      }

      rotation += 0.002;
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
      suppressHydrationWarning
    />
  );
}

