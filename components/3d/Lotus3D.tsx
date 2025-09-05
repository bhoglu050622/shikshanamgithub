'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useTheme } from '@/lib/theme'

function LotusPetal({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Number((Math.sin(state.clock.elapsedTime * 0.5) * 0.1).toFixed(3))
      meshRef.current.position.y = Number((position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05).toFixed(3))
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[0.8, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

function LotusCenter({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Number((state.clock.elapsedTime * 0.3).toFixed(3))
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
      <meshStandardMaterial 
        color="#C49B0B" 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function LotusGroup() {
  const { actualTheme } = useTheme()
  
  const petalPositions = useMemo(() => {
    const positions: Array<{ pos: [number, number, number], rot: [number, number, number] }> = []
    const petalCount = 8
    
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2
      const radius = 1.2
      const x = Number((Math.cos(angle) * radius).toFixed(3))
      const z = Number((Math.sin(angle) * radius).toFixed(3))
      const y = 0
      
      positions.push({
        pos: [x, y, z],
        rot: [0, Number(angle.toFixed(3)), 0]
      })
    }
    
    return positions
  }, [])
  
  // Fallback for SSR - return a simple group to avoid hydration issues
  if (typeof window === 'undefined') {
    return <group />
  }

  const petalColor = actualTheme === 'dark' ? '#FF8A00' : '#FF6F00'

  return (
    <group>
      {/* Outer petals */}
      {petalPositions.map((petal, index) => (
        <LotusPetal
          key={`outer-${index}`}
          position={petal.pos}
          rotation={petal.rot}
          color={petalColor}
        />
      ))}
      
      {/* Inner petals (smaller) */}
      {petalPositions.map((petal, index) => (
        <LotusPetal
          key={`inner-${index}`}
          position={[petal.pos[0] * 0.6, petal.pos[1] + 0.1, petal.pos[2] * 0.6]}
          rotation={petal.rot}
          color={actualTheme === 'dark' ? '#FFB74D' : '#FFB74D'}
        />
      ))}
      
      {/* Center */}
      <LotusCenter position={[0, 0.1, 0]} />
    </group>
  )
}

export default function Lotus3D({ className = '' }: { className?: string }) {
  // Don't render during SSR to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return (
      <div className={`w-32 h-32 ${className}`}>
        <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin mx-auto mt-8"></div>
      </div>
    )
  }

  // Additional safety check for React reconciler
  try {
    return (
      <div className={`w-32 h-32 ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <LotusGroup />
        </Canvas>
      </div>
    )
  } catch (error) {
    console.error('Lotus3D render error:', error)
    return (
      <div className={`w-32 h-32 ${className}`}>
        <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin mx-auto mt-8"></div>
      </div>
    )
  }
}
