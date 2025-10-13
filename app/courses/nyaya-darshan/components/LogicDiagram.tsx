'use client';

import { useEffect, useRef } from 'react';

export default function LogicDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawNode = (x: number, y: number, label: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
      
      ctx.restore();
    };

    const drawConnection = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      if (!canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Premise 1
      const p1X = centerX - 150;
      const p1Y = centerY - 100;
      const p1Opacity = 0.3 + Math.sin(phase) * 0.2;
      drawNode(p1X, p1Y, 'P1', p1Opacity);

      // Premise 2  
      const p2X = centerX + 150;
      const p2Y = centerY - 100;
      const p2Opacity = 0.3 + Math.sin(phase + 1) * 0.2;
      drawNode(p2X, p2Y, 'P2', p2Opacity);

      // Conclusion
      const cX = centerX;
      const cY = centerY + 100;
      const cOpacity = 0.3 + Math.sin(phase + 2) * 0.2;
      drawNode(cX, cY, 'C', cOpacity);

      // Draw connections
      drawConnection(p1X, p1Y + 25, cX, cY - 25, p1Opacity);
      drawConnection(p2X, p2Y + 25, cX, cY - 25, p2Opacity);

      phase += 0.02;
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
      style={{ opacity: 0.5 }}
      suppressHydrationWarning
    />
  );
}

