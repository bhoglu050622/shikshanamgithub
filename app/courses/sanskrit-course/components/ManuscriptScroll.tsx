'use client';

import { useEffect, useRef } from 'react';

export default function ManuscriptScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scrollPhase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawScrollEdge = (x: number, y: number, width: number, height: number) => {
      const scrollWidth = 40;
      
      // Left scroll edge
      const leftGradient = ctx.createLinearGradient(x, 0, x + scrollWidth, 0);
      leftGradient.addColorStop(0, 'rgba(139, 92, 33, 0.3)');
      leftGradient.addColorStop(0.5, 'rgba(217, 119, 6, 0.2)');
      leftGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = leftGradient;
      ctx.fillRect(x, y, scrollWidth, height);
      
      // Right scroll edge
      const rightGradient = ctx.createLinearGradient(x + width - scrollWidth, 0, x + width, 0);
      rightGradient.addColorStop(0, 'transparent');
      rightGradient.addColorStop(0.5, 'rgba(217, 119, 6, 0.2)');
      rightGradient.addColorStop(1, 'rgba(139, 92, 33, 0.3)');
      
      ctx.fillStyle = rightGradient;
      ctx.fillRect(x + width - scrollWidth, y, scrollWidth, height);

      // Draw scroll curves
      ctx.strokeStyle = 'rgba(139, 92, 33, 0.4)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        const yPos = y + (height / 4) * (i + 1);
        
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.bezierCurveTo(
          x + scrollWidth / 2, yPos - 10,
          x + scrollWidth / 2, yPos + 10,
          x + scrollWidth, yPos
        );
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + width - scrollWidth, yPos);
        ctx.bezierCurveTo(
          x + width - scrollWidth / 2, yPos + 10,
          x + width - scrollWidth / 2, yPos - 10,
          x + width, yPos
        );
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw unfurling effect
      const unfurlProgress = Math.min(1, (scrollPhase % 100) / 50);
      const currentWidth = canvas.width * unfurlProgress;

      if (currentWidth > 0) {
        drawScrollEdge(
          (canvas.width - currentWidth) / 2,
          0,
          currentWidth,
          canvas.height
        );
      }

      scrollPhase += 0.5;
      if (scrollPhase > 100) scrollPhase = 50; // Keep partially unfurled

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
      style={{ opacity: 0.3 }}
      suppressHydrationWarning
    />
  );
}

