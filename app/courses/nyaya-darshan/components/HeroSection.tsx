'use client';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Network, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function HeroSection() {
  const enrollmentLink = "https://courses.shikshanam.in/single-checkout/64bf7b3fe4b04cc6d3b00311?pid=p2";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 30;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.fill();

        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="nyaya-hero min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Logic Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-slate-900/30" style={{ zIndex: 2 }}></div>
      
      <div className="nyaya-hero-content container-custom text-center relative px-4 py-12" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-blue-200/50 mb-8"
          >
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">Master the Art of Logic & Reasoning</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent mb-3">
              Nyaya Philosophy
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-white/95">
              through Rishi Gautama&apos;s Nyaya Sutras
            </span>
          </motion.h1>
          
          {/* Hindi Tagline */}
          <motion.p 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mt-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            ईश्वर को तर्क और प्रमाणों से समझें!
          </motion.p>

          {/* Feature Stats */}
          <motion.div 
            className="flex flex-wrap gap-6 justify-center items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-blue-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-600">Skill Level</p>
                <p className="text-sm font-bold text-slate-900">Beginner</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-blue-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">हिं</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-600">Language</p>
                <p className="text-sm font-bold text-slate-900">हिन्दी</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-blue-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-600">Duration</p>
                <p className="text-sm font-bold text-slate-900">4-5 Hours</p>
              </div>
            </div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div 
            className="max-w-lg mx-auto mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-200/50">
              <div className="flex items-baseline justify-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">₹3,499</span>
                <span className="text-2xl md:text-3xl text-slate-400 line-through">₹5,199</span>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">33% OFF</span>
              </div>

              <ProtectedExternalLink 
                href={enrollmentLink}
                className="w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Enroll Now • ₹3,499</span>
                <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
              </ProtectedExternalLink>
              
              <p className="text-sm text-slate-600 mt-4">
                🔒 Secure Payment • Lifetime Access • Certificate Included
              </p>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div 
            className="mt-12 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white"></div>
                </div>
                <span className="text-lg font-semibold ml-2">1000+ Students</span>
              </div>
              <p className="text-base md:text-lg text-white/80 font-medium">
                हजारों छात्रों, गृहणियों, जिज्ञासुओं ने अपनाया न्याय दर्शन को
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
