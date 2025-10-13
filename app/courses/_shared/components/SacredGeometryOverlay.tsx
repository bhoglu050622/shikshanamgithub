'use client';

import { useEffect, useState } from 'react';

interface SacredGeometryOverlayProps {
  pattern?: 'mandala' | 'yantra' | 'om' | 'lotus' | 'chakra' | 'sri-yantra';
  color?: string;
  opacity?: number;
  animate?: boolean;
  className?: string;
}

export default function SacredGeometryOverlay({
  pattern = 'mandala',
  color = 'currentColor',
  opacity = 0.08,
  animate = true,
  className = '',
}: SacredGeometryOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateMandalaLines = () => {
    return [...Array(8)]
      .map(
        (_, i) =>
          `<line x1="100" y1="100" x2="${100 + 80 * Math.cos((i * Math.PI) / 4)}" y2="${
            100 + 80 * Math.sin((i * Math.PI) / 4)
          }" stroke="${color}" stroke-width="1"/>`
      )
      .join('');
  };

  const generateSriYantraPolygons = () => {
    return [...Array(9)]
      .map(
        (_, i) =>
          `<polygon points="75,15 115,135 35,135" fill="none" stroke="${color}" stroke-width="0.5" transform="rotate(${
            i * 40
          } 75 75)"/>`
      )
      .join('');
  };

  const generateLotusPetals = () => {
    return [...Array(8)]
      .map(
        (_, i) =>
          `<ellipse cx="50" cy="50" rx="15" ry="35" fill="none" stroke="${color}" stroke-width="1" transform="rotate(${
            i * 45
          } 50 50)"/>`
      )
      .join('');
  };

  const generateChakraCircles = () => {
    return [...Array(7)]
      .map(
        (_, i) =>
          `<circle cx="${50 + 35 * Math.cos((i * 2 * Math.PI) / 7)}" cy="${
            50 + 35 * Math.sin((i * 2 * Math.PI) / 7)
          }" r="8" fill="none" stroke="${color}" stroke-width="1"/>`
      )
      .join('');
  };

  const patterns: Record<string, string> = {
    mandala: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="100" cy="100" r="20" fill="none" stroke="${color}" stroke-width="2"/>
      <path d="M100,20 L140,80 L120,140 L80,140 L60,80 Z" fill="none" stroke="${color}" stroke-width="2"/>
      ${generateMandalaLines()}
    </svg>`,
    yantra: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 90,90 10,35 90,35 10,90" fill="none" stroke="${color}" stroke-width="1"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="${color}" stroke-width="1"/>
    </svg>`,
    'sri-yantra': `<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="75" r="70" fill="none" stroke="${color}" stroke-width="1"/>
      <circle cx="75" cy="75" r="60" fill="none" stroke="${color}" stroke-width="1"/>
      <circle cx="75" cy="75" r="50" fill="none" stroke="${color}" stroke-width="1"/>
      ${generateSriYantraPolygons()}
    </svg>`,
    om: `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      <text x="60" y="80" font-size="80" fill="${color}" text-anchor="middle" font-family="Noto Sans Devanagari, sans-serif">ॐ</text>
    </svg>`,
    lotus: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      ${generateLotusPetals()}
      <circle cx="50" cy="50" r="10" fill="none" stroke="${color}" stroke-width="2"/>
    </svg>`,
    chakra: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="none" stroke="${color}" stroke-width="2"/>
      ${generateChakraCircles()}
    </svg>`,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ 
        opacity,
        color,
      }}
      suppressHydrationWarning
    >
      <div
        className={`absolute inset-0 ${animate ? 'animate-rotate-sacred' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(patterns[pattern])}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: pattern === 'om' ? '120px 120px' : pattern === 'sri-yantra' ? '150px 150px' : '100px 100px',
        }}
      />
    </div>
  );
}

