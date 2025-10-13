'use client';

import { useEffect, useRef } from 'react';

const chakras = [
  { name: 'Root', color: '#F43F5E' },
  { name: 'Sacral', color: '#FB923C' },
  { name: 'Solar Plexus', color: '#FBBF24' },
  { name: 'Heart', color: '#10B981' },
  { name: 'Throat', color: '#06B6D4' },
  { name: 'Third Eye', color: '#6366F1' },
  { name: 'Crown', color: '#A855F7' },
];

export default function ChakraWheel() {
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

    const drawChakraWheel = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Draw chakra segments
      const angleStep = (Math.PI * 2) / chakras.length;
      chakras.forEach((chakra, index) => {
        const startAngle = index * angleStep;
        const endAngle = (index + 1) * angleStep;

        // Create gradient for each chakra
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, chakra.color + '80');
        gradient.addColorStop(1, chakra.color + '20');

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw separator lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(startAngle) * radius, Math.sin(startAngle) * radius);
        ctx.stroke();
      });

      // Draw center circle
      const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.3);
      centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
      
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      rotation += 0.005;
      animationFrameId = requestAnimationFrame(drawChakraWheel);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawChakraWheel();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md pointer-events-none"
      style={{ opacity: 0.5 }}
      suppressHydrationWarning
    />
  );
}

