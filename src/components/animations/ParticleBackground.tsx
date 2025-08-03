import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'heavy';
}

export function ParticleBackground({ 
  particleCount = 20, 
  className = '',
  intensity = 'subtle'
}: ParticleBackgroundProps) {
  
  const particles = useMemo(() => {
    const colors = [
      'oklch(0.75 0.25 142 / 0.3)', // Primary green
      'oklch(0.65 0.30 240 / 0.3)', // Accent blue
      'oklch(0.70 0.28 25 / 0.3)',  // Secondary orange
      'oklch(0.60 0.25 300 / 0.3)'  // Accent purple
    ];

    const intensitySettings = {
      subtle: { sizeRange: [1, 3], opacityRange: [0.1, 0.3], speedRange: [20, 40] },
      medium: { sizeRange: [2, 5], opacityRange: [0.2, 0.5], speedRange: [15, 35] },
      heavy: { sizeRange: [3, 8], opacityRange: [0.3, 0.7], speedRange: [10, 30] }
    };

    const settings = intensitySettings[intensity];

    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (settings.sizeRange[1] - settings.sizeRange[0]) + settings.sizeRange[0],
      duration: Math.random() * (settings.speedRange[1] - settings.speedRange[0]) + settings.speedRange[0],
      delay: Math.random() * 10,
      opacity: Math.random() * (settings.opacityRange[1] - settings.opacityRange[0]) + settings.opacityRange[0],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [particleCount, intensity]);

  const floatVariants = {
    animate: (particle: Particle) => ({
      y: [0, -20, 0],
      x: [0, Math.random() * 10 - 5, 0],
      scale: [1, 1.2, 1],
      opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
      transition: {
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: particle.delay
      }
    })
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          variants={floatVariants}
          animate="animate"
          custom={particle}
        />
      ))}
      
      {/* Geometric shapes for gaming aesthetic */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-1 h-1 border border-primary/20"
        animate={{
          rotate: 360,
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-2 h-2"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          backgroundColor: 'oklch(0.65 0.30 240 / 0.2)'
        }}
        animate={{
          rotate: -360,
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-2/3 left-2/3 w-3 h-3 border border-secondary/15"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}