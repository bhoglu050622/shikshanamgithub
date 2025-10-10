'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useTheme } from '@/lib/theme'

function YantraRing({ radius, thickness, color, rotationSpeed = 0.5 }: { 
  radius: number, 
  thickness: number, 
  color: string, 
  rotationSpeed?: number 
}) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Number((state.clock.elapsedTime * rotationSpeed).toFixed(3))
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, thickness, 8, 16]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.7}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  )
}

function YantraCenter() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Number((state.clock.elapsedTime * 0.3).toFixed(3))
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial 
        color="#C49B0B" 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function YantraGroup() {
  const { actualTheme } = useTheme()
  
  // Fallback for SSR - return a simple group to avoid hydration issues
  if (typeof window === 'undefined') {
    return <group />
  }
  
  const primaryColor = actualTheme === 'dark' ? '#FF8A00' : '#FF6F00'
  const secondaryColor = actualTheme === 'dark' ? '#3F51B5' : '#1A237E'
  const accentColor = actualTheme === 'dark' ? '#26A69A' : '#0C3B3C'

  return (
    <group>
      {/* Outer ring */}
      <YantraRing radius={2} thickness={0.1} color={primaryColor} rotationSpeed={0.3} />
      
      {/* Middle ring */}
      <YantraRing radius={1.5} thickness={0.08} color={secondaryColor} rotationSpeed={-0.4} />
      
      {/* Inner ring */}
      <YantraRing radius={1} thickness={0.06} color={accentColor} rotationSpeed={0.5} />
      
      {/* Center */}
      <YantraCenter />
      
      {/* Decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 1.8
        const x = Number((Math.cos(angle) * radius).toFixed(3))
        const y = Number((Math.sin(angle) * radius).toFixed(3))
        
        return (
          <mesh key={`yantra-decor-${i}`} position={[x, y, 0]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial 
              color={primaryColor} 
              transparent 
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Yantra3D({ className = '' }: { className?: string }) {
  // Don't render during SSR to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return (
      <div className={`w-24 h-24 ${className}`}>
        <div className="w-12 h-12 border-4 border-turquoise-200 border-t-turquoise-600 rounded-full animate-spin mx-auto mt-6"></div>
      </div>
    )
  }

  // Additional safety check for React reconciler
  try {
    return (
      <div className={`w-24 h-24 ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <YantraGroup />
        </Canvas>
      </div>
    )
  } catch (error) {
    console.error('Yantra3D render error:', error)
    return (
      <div className={`w-24 h-24 ${className}`}>
        <div className="w-12 h-12 border-4 border-turquoise-200 border-t-turquoise-600 rounded-full animate-spin mx-auto mt-6"></div>
      </div>
    )
  }
}
