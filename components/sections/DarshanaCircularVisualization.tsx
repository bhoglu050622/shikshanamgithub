'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { 
  Brain, 
  Atom, 
  Eye, 
  Heart, 
  Scale, 
  Lightbulb,
  Lock,
  Star
} from 'lucide-react'

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin)

// Darshana data with circular positioning
const darshanas = [
  {
    id: 'nyaya',
    name: 'Nyāya',
    sanskrit: 'न्याय',
    description: 'The Science of Logic & Reasoning',
    tooltip: 'Think clearly; infer soundly.',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    angle: 0, // Top position
    position: { x: 0, y: -1 }
  },
  {
    id: 'vaisheshika',
    name: 'Vaiśeṣika',
    sanskrit: 'वैशेषिक',
    description: 'The Atomic Theory of Reality',
    tooltip: 'What reality is made of.',
    icon: Atom,
    color: 'from-green-500 to-green-600',
    hoverColor: 'from-green-600 to-green-700',
    angle: 60, // Top-right position
    position: { x: 0.866, y: -0.5 }
  },
  {
    id: 'samkhya',
    name: 'Sāṅkhya',
    sanskrit: 'साङ्ख्य',
    description: 'The Map of Consciousness',
    tooltip: 'Puruṣa & Prakṛti—two principles.',
    icon: Eye,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-600 to-purple-700',
    angle: 120, // Bottom-right position
    position: { x: 0.866, y: 0.5 }
  },
  {
    id: 'yoga',
    name: 'Yoga',
    sanskrit: 'योग',
    description: 'The Path of Self-Realization',
    tooltip: 'Still the mind; transform life.',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    hoverColor: 'from-red-600 to-red-700',
    angle: 180, // Bottom position
    position: { x: 0, y: 1 }
  },
  {
    id: 'mimamsa',
    name: 'Mīmāṁsā',
    sanskrit: 'मीमांसा',
    description: 'The Science of Dharma',
    tooltip: 'Duty, ethics, ritual praxis.',
    icon: Scale,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'from-orange-600 to-orange-700',
    angle: 240, // Bottom-left position
    position: { x: -0.866, y: 0.5 }
  },
  {
    id: 'vedanta',
    name: 'Vedānta',
    sanskrit: 'वेदान्त',
    description: 'The Ultimate Reality',
    tooltip: 'Self = Brahman (non-dual insight).',
    icon: Lightbulb,
    color: 'from-yellow-500 to-yellow-600',
    hoverColor: 'from-yellow-600 to-yellow-700',
    angle: 300, // Top-left position
    position: { x: -0.866, y: -0.5 }
  }
]

interface DarshanaCircularVisualizationProps {
  onDarshanaClick?: (darshanaId: string) => void
}

export default function DarshanaCircularVisualization({ 
  onDarshanaClick 
}: DarshanaCircularVisualizationProps) {
  const [hoveredDarshana, setHoveredDarshana] = useState<string | null>(null)
  const [clickedDarshanas, setClickedDarshanas] = useState<Set<string>>(new Set())
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [flameAnimations, setFlameAnimations] = useState<Set<string>>(new Set())
  const [layout, setLayout] = useState<ReturnType<typeof getDynamicLayout> | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const omRef = useRef<HTMLDivElement>(null)
  const flameRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Calculate layout on mount and resize
  useEffect(() => {
    const calculateLayout = () => {
      // Wait for DOM to be ready
      setTimeout(() => {
        const layout = getDynamicLayout()
        setLayout(layout)
        
        // Debug: Check if all nodes exist in DOM
        const darshanNodes = document.querySelectorAll('[data-id]')
        console.log('Darshan nodes found:', darshanNodes.length, 'Expected: 6')
        
        // Debug: Log each node's data-id
        darshanNodes.forEach((node, idx) => {
          console.log(`Node ${idx}:`, node.getAttribute('data-id'))
        })
        
        // Debug: Check SVG dimensions
        const svg = svgRef.current
        if (svg) {
          const bbox = svg.getBBox()
          console.log('SVG bbox:', bbox)
          console.log('Layout:', layout)
        }
      }, 100)
    }
    
    calculateLayout()
    
    // Debounced resize handler
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(calculateLayout, 100)
    }
    
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  // Check if all darshanas are clicked
  useEffect(() => {
    if (clickedDarshanas.size === 6) {
      setIsUnlocked(true)
      // Start OM rotation when unlocked
      if (omRef.current) {
        gsap.to(omRef.current, {
          rotation: 360,
          repeat: -1,
          duration: 3,
          ease: "none",
          transformOrigin: "50% 50%"
        })
      }
    } else {
      // Stop OM rotation when locked
      if (omRef.current) {
        gsap.killTweensOf(omRef.current)
      }
    }
  }, [clickedDarshanas])

  // Start flame travel animation
  const startFlameFromNode = (darshanaId: string) => {
    if (!layout) return
    
    const flameElement = flameRefs.current.get(darshanaId)
    const pathId = `#connection-path-${darshanaId}`
    
    if (flameElement) {
      // Reset flame position
      gsap.set(flameElement, { opacity: 1, scale: 1 })
      
      // Animate flame along path
      gsap.to(flameElement, {
        duration: 1.6,
        ease: "power1.inOut",
        motionPath: {
          path: pathId,
          align: pathId,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        onComplete: () => {
          // Fade out flame
          gsap.to(flameElement, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3
          })
        }
      })
    }
  }

  // Handle darshana click
  const handleDarshanaClick = (darshanaId: string, event?: React.MouseEvent) => {
    // Prevent default behavior and event propagation
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    const wasClicked = clickedDarshanas.has(darshanaId)
    
    setClickedDarshanas(prev => {
      const newSet = new Set(prev)
      if (wasClicked) {
        newSet.delete(darshanaId)
      } else {
        newSet.add(darshanaId)
        // Start flame travel animation
        startFlameFromNode(darshanaId)
      }
      return newSet
    })
  }

  // Dynamic layout calculation based on container size and node dimensions
  const getDynamicLayout = () => {
    if (typeof window === 'undefined') {
      // Fallback for SSR
      return {
        svgSize: 600,
        center: 300,
        radius: 200,
        nodeSize: 80,
        nodeRadius: 40
      }
    }
    
    const containerSize = Math.min(window.innerWidth * 0.9, 700)
    const svgSize = containerSize
    const center = svgSize / 2
    
    // Calculate node size (including padding for hover effects)
    const nodeSize = Math.max(80, containerSize * 0.12) // Responsive node size
    const nodeRadius = nodeSize / 2
    
    // Calculate minimum radius to prevent overlap
    // Each node needs space for its size + padding + some margin
    const minRadius = (nodeSize + 40) / (2 * Math.sin(Math.PI / 6)) // 30 degrees between nodes
    
    // Use a radius that's at least 35% of the container but not less than minRadius
    const radius = Math.max(minRadius, svgSize * 0.35)
    
    const layout = {
      svgSize,
      center,
      radius,
      nodeSize,
      nodeRadius
    }
    
    // Debug: Log layout calculation
    console.log('Layout calculated:', layout)
    
    return layout
  }

  // Calculate node positions for circular layout
  const getNodePosition = (angle: number, layout: ReturnType<typeof getDynamicLayout>) => {
    const radians = (angle * Math.PI) / 180
    const position = {
      x: Math.sin(radians) * layout.radius + layout.center,
      y: -Math.cos(radians) * layout.radius + layout.center
    }
    
    // Debug: Log position calculation
    console.log(`Position for angle ${angle}:`, {
      radians,
      radius: layout.radius,
      center: layout.center,
      position
    })
    
    return position
  }

  // Generate path for flame animation
  const getFlamePath = (angle: number, layout: ReturnType<typeof getDynamicLayout>) => {
    const nodePos = getNodePosition(angle, layout)
    const centerPos = { x: layout.center, y: layout.center }
    
    // Create a curved path from node to center
    const controlPoint = {
      x: (nodePos.x + centerPos.x) / 2 + (Math.random() - 0.5) * (layout.radius * 0.2),
      y: (nodePos.y + centerPos.y) / 2 + (Math.random() - 0.5) * (layout.radius * 0.2)
    }
    
    return `M ${nodePos.x} ${nodePos.y} Q ${controlPoint.x} ${controlPoint.y} ${centerPos.x} ${centerPos.y}`
  }

  // Debug: Log darshanas array
  console.log('Darshanas array length:', darshanas.length)
  console.log('Darshanas IDs:', darshanas.map(d => d.id))

  // Don't render until layout is calculated
  if (!layout) {
    return (
      <div className="flex justify-center mb-4 overflow-visible">
        <div className="w-[min(90vw,700px)] h-[min(90vw,700px)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-4 overflow-visible">
                {/* Debug indicator */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs z-50 max-w-xs">
            <div>Debug: {darshanas.length} darshanas</div>
            <div>Layout: {layout ? 'Ready' : 'Loading'}</div>
            {layout && (
              <div className="mt-1">
                <div>Size: {layout.svgSize}x{layout.svgSize}</div>
                <div>Center: ({layout.center}, {layout.center})</div>
                <div>Radius: {layout.radius}</div>
                <div>Nodes: {darshanas.map(d => d.id).join(', ')}</div>
              </div>
            )}
          </div>
      
      <motion.div
        className="relative w-[min(90vw,700px)] h-[min(90vw,700px)] perspective-1000"
        style={{ 
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* SVG for connections and flame animations */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox={`0 0 ${layout.svgSize} ${layout.svgSize}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient definitions */}
          <defs>
            {/* Flame gradient */}
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
            </linearGradient>
            
            {/* Connection gradient */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0891b2" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
            </linearGradient>
            
            {/* Particle gradient */}
            <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={Math.random() * layout.svgSize}
              cy={Math.random() * layout.svgSize}
              r="2"
              fill="url(#particleGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * (layout.svgSize * 0.2)],
                y: [0, (Math.random() - 0.5) * (layout.svgSize * 0.2)]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Connection lines from each node to center */}
          {darshanas.map((darshana) => {
            const nodePos = getNodePosition(darshana.angle, layout)
            const centerPos = { x: layout.center, y: layout.center }
            const isActive = hoveredDarshana === darshana.id || clickedDarshanas.has(darshana.id)
            
            // Debug: Log connection path coordinates
            console.log(`Connection ${darshana.id}:`, {
              nodePos,
              centerPos,
              path: `M ${nodePos.x} ${nodePos.y} L ${centerPos.x} ${centerPos.y}`
            })
            
            return (
              <motion.path
                key={`connection-${darshana.id}`}
                id={`connection-path-${darshana.id}`}
                d={`M ${nodePos.x} ${nodePos.y} L ${centerPos.x} ${centerPos.y}`}
                stroke={isActive ? "url(#flameGradient)" : "url(#connectionGradient)"}
                strokeWidth={isActive ? "3" : "2"}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: isActive ? 0.8 : 0.3
                }}
                transition={{
                  pathLength: { duration: 1, delay: 0.5 },
                  opacity: { duration: 0.3 }
                }}
              />
            )
          })}

          {/* Flame elements for GSAP animation */}
          {darshanas.map((darshana) => {
            const nodePos = getNodePosition(darshana.angle, layout)
            return (
              <div
                key={`flame-${darshana.id}`}
                ref={(el) => {
                  if (el) flameRefs.current.set(darshana.id, el)
                }}
                className="absolute w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 pointer-events-none"
                style={{
                  left: `${(nodePos.x / layout.svgSize) * 100}%`,
                  top: `${(nodePos.y / layout.svgSize) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15
                }}
              />
            )
          })}
        </svg>

        {/* Central Core */}
        <motion.div
          id="center"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ 
            scale: 1.15,
            transition: { duration: 0.3 }
          }}
          className={`absolute w-24 h-24 bg-gradient-to-r from-saffron-400 via-deep-teal-400 to-indigo-400 rounded-full shadow-2xl flex items-center justify-center z-20 cursor-pointer group ${isUnlocked ? '' : 'locked'}`}
          style={{
            left: `${(layout.center / layout.svgSize) * 100}%`,
            top: `${(layout.center / layout.svgSize) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => {
            if (isUnlocked) {
              setClickedDarshanas(new Set())
              setIsUnlocked(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={isUnlocked ? "Unlocked wisdom center - click to reset" : "Locked wisdom center - click all darshanas to unlock"}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (isUnlocked) {
                setClickedDarshanas(new Set())
                setIsUnlocked(false)
              }
            }
          }}
        >
          <div className="w-20 h-20 bg-white/90 dark:bg-wisdom-800/90 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
            {isUnlocked ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-12 h-12 bg-gradient-to-r from-saffron-400 to-deep-teal-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <div 
                  ref={omRef}
                  id="om-symbol"
                  className="text-white text-2xl font-devanagari"
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center center',
                    willChange: 'transform'
                  }}
                >
                  ॐ
                </div>
              </motion.div>
            ) : (
              <motion.div
                animate={{ 
                  scale: clickedDarshanas.size > 0 ? [1, 1.1, 1] : 1,
                  rotate: clickedDarshanas.size > 0 ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: clickedDarshanas.size > 0 ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 bg-gradient-to-r from-saffron-400 to-deep-teal-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <Lock className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </div>
          
          {/* Pulsing energy rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              animate={{ 
                scale: [1, 1.5 + ring * 0.3, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 2 + ring * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.3
              }}
              className="absolute inset-0 border-2 border-saffron-300/50 dark:border-saffron-400/50 rounded-full"
              style={{ scale: 1 + ring * 0.2 }}
            />
          ))}
        </motion.div>

        {/* Darshana Nodes */}
        {darshanas.map((darshana, index) => {
          // Ensure we have valid data
          if (!darshana || !darshana.id) {
            console.error('Invalid darshana data at index:', index, darshana)
            return null
          }
          const nodePos = getNodePosition(darshana.angle, layout)
          const isHovered = hoveredDarshana === darshana.id
          const isClicked = clickedDarshanas.has(darshana.id)
          
          // Debug: Log node positioning
          console.log(`Node ${index} (${darshana.id}):`, {
            angle: darshana.angle,
            nodePos,
            percentage: {
              left: `${(nodePos.x / layout.svgSize) * 100}%`,
              top: `${(nodePos.y / layout.svgSize) * 100}%`
            }
          })
          
          return (
            <motion.button
              key={darshana.id}
              data-id={darshana.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, Math.sin(Date.now() * 0.001 + index) * 3, 0],
                y: [0, Math.cos(Date.now() * 0.001 + index) * 2, 0]
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
                x: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ 
                scale: 1.3, 
                rotateZ: 10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.9,
                transition: { duration: 0.1 }
              }}
              onMouseEnter={() => setHoveredDarshana(darshana.id)}
              onMouseLeave={() => setHoveredDarshana(null)}
              onClick={(e) => handleDarshanaClick(darshana.id, e)}
              className={`absolute group focus-ring z-10 ${isClicked ? 'activated' : ''}`}
              style={{
                left: `${(nodePos.x / layout.svgSize) * 100}%`,
                top: `${(nodePos.y / layout.svgSize) * 100}%`,
                transform: 'translate(-50%, -50%)',
                visibility: 'visible',
                display: 'block',
                pointerEvents: 'auto',
                zIndex: 20 + index // Ensure proper stacking order
              }}
              aria-label={`Learn about ${darshana.name} - ${darshana.tooltip}`}
              aria-pressed={isClicked}
              aria-expanded={isHovered}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleDarshanaClick(darshana.id)
                }
              }}
            >
              <div 
                className={`
                  bg-gradient-to-r ${darshana.color} hover:${darshana.hoverColor} rounded-full shadow-lg
                  flex items-center justify-center text-white
                  group-hover:shadow-2xl transition-all duration-300
                  border-2 ${isClicked ? 'border-white/60' : 'border-white/20'} group-hover:border-white/40
                  relative overflow-hidden
                  ${isClicked ? 'ring-4 ring-saffron-300/50' : ''}
                `}
                style={{
                  width: `${layout.nodeSize}px`,
                  height: `${layout.nodeSize}px`
                }}
              >
                <darshana.icon 
                  className="group-hover:scale-110 transition-transform duration-300"
                  style={{
                    width: `${layout.nodeSize * 0.5}px`,
                    height: `${layout.nodeSize * 0.5}px`
                  }}
                />
                
                {/* Flowing shine effect */}
                <motion.div 
                  animate={{ 
                    x: ['-100%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                />
                
                {/* Energy pulse */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4
                  }}
                  className="absolute inset-0 border-2 border-white/40 rounded-full"
                />

                {/* Clicked indicator */}
                {isClicked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center"
                  >
                    <Star className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
              
              {/* Enhanced Tooltip */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 10, 
                  scale: isHovered ? 1 : 0.9,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 pointer-events-none z-30"
              >
                <div className="bg-wisdom-800 dark:bg-wisdom-200 text-white dark:text-wisdom-800 px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-2xl border border-white/10 backdrop-blur-sm">
                  <div className="font-bold text-base">{darshana.name}</div>
                  <div className="text-xs opacity-90 mb-1">{darshana.sanskrit}</div>
                  <div className="text-xs opacity-80">{darshana.tooltip}</div>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-wisdom-800 dark:border-t-wisdom-200"></div>
              </motion.div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
