'use client';

import { useEffect, useRef } from 'react';

export default function CosmicQuestionIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawQuestionMark = (x: number, y: number, size: number, opacity: number, rotate: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotate);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;

      // Question mark curve
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 0.3, Math.PI, 0, false);
      ctx.stroke();

      // Question mark stem
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size * 0.2);
      ctx.stroke();

      // Question mark dot
      ctx.beginPath();
      ctx.arc(0, size * 0.4, size * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create constellation of question marks
      const positions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 30 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2, size: 25 },
        { x: canvas.width * 0.6, y: canvas.height * 0.7, size: 35 },
        { x: canvas.width * 0.3, y: canvas.height * 0.8, size: 20 },
        { x: canvas.width * 0.85, y: canvas.height * 0.6, size: 28 },
      ];

      positions.forEach((pos, i) => {
        const phase = rotation + i * 0.5;
        const opacity = 0.2 + Math.sin(phase) * 0.15;
        drawQuestionMark(pos.x, pos.y, pos.size, opacity, rotation * 0.5 + i);
      });

      rotation += 0.01;
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
      style={{ opacity: 0.4 }}
      suppressHydrationWarning
    />
  );
}

