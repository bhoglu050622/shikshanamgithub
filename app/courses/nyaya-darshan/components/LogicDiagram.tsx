'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LogicNode {
  id: string;
  text: string;
  x: number;
  y: number;
  type: 'premise' | 'conclusion';
}

interface LogicConnection {
  from: string;
  to: string;
}

interface LogicDiagramProps {
  nodes: LogicNode[];
  connections: LogicConnection[];
  activeNodeId?: string;
}

export default function LogicDiagram({ nodes, connections, activeNodeId }: LogicDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'; // Purple with opacity
      ctx.lineWidth = 2;

      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          
          // Create a curved line
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2 - 30; // Control point above the line
          
          ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y);
          ctx.stroke();

          // Draw arrow at the end
          const angle = Math.atan2(toNode.y - midY, toNode.x - midX);
          const arrowLength = 10;
          
          ctx.beginPath();
          ctx.moveTo(toNode.x, toNode.y);
          ctx.lineTo(
            toNode.x - arrowLength * Math.cos(angle - Math.PI / 6),
            toNode.y - arrowLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(toNode.x, toNode.y);
          ctx.lineTo(
            toNode.x - arrowLength * Math.cos(angle + Math.PI / 6),
            toNode.y - arrowLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      });
    };

    // Initial draw
    drawConnections();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [nodes, connections]);

  return (
    <div className="relative w-full h-[400px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute px-6 py-3 rounded-xl shadow-lg cursor-pointer select-none
            ${node.type === 'premise' 
              ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white' 
              : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'}
            ${activeNodeId === node.id ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}`}
          style={{
            left: node.x - 75,
            top: node.y - 25,
            width: '150px',
            textAlign: 'center'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {node.text}
        </motion.div>
      ))}
    </div>
  );
}