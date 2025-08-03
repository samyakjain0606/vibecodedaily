import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface HexagonalBackgroundProps {
  className?: string;
  density?: 'sparse' | 'medium' | 'dense';
  animated?: boolean;
  opacity?: number;
}

export function HexagonalBackground({ 
  className = '',
  density = 'medium',
  animated = true,
  opacity = 0.1
}: HexagonalBackgroundProps) {
  
  const hexagons = useMemo(() => {
    const densitySettings = {
      sparse: { count: 8, size: 'large' },
      medium: { count: 15, size: 'medium' },
      dense: { count: 25, size: 'small' }
    };

    const settings = densitySettings[density];
    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-8 h-8'
    };

    return Array.from({ length: settings.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizeClasses[settings.size as keyof typeof sizeClasses],
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 20,
      opacity: opacity * (0.5 + Math.random() * 0.5)
    }));
  }, [density, opacity]);

  const hexagonVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1]
    }
  };

  // SVG hexagon path
  const hexagonPath = "M 10,2.5 L 17.5,7 L 17.5,14 L 10,18.5 L 2.5,14 L 2.5,7 Z";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* SVG Pattern Definition */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <defs>
          <pattern
            id="hexagon-pattern"
            x="0"
            y="0"
            width="40"
            height="35"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={hexagonPath}
              fill="none"
              stroke="oklch(0.75 0.25 142)"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
        </defs>
      </svg>

      {/* Animated individual hexagons */}
      {hexagons.map((hexagon) => (
        <motion.div
          key={hexagon.id}
          className={`absolute ${hexagon.size}`}
          style={{
            left: `${hexagon.x}%`,
            top: `${hexagon.y}%`,
          }}
          variants={animated ? hexagonVariants : undefined}
          animate={animated ? "animate" : undefined}
        >
          <svg
            viewBox="0 0 20 20"
            className="w-full h-full"
          >
            <path
              d={hexagonPath}
              fill="oklch(0.75 0.25 142)"
              stroke="oklch(0.65 0.30 240)"
              strokeWidth="0.5"
              opacity={hexagon.opacity}
            />
          </svg>
        </motion.div>
      ))}

      {/* Large geometric accents */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-16 h-16 opacity-10"
        animate={animated ? {
          rotate: 360,
          scale: [1, 1.1, 1],
        } : undefined}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <polygon
            points="30,5 55,20 55,40 30,55 5,40 5,20"
            fill="none"
            stroke="oklch(0.75 0.25 142)"
            strokeWidth="1"
          />
          <polygon
            points="30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5"
            fill="oklch(0.75 0.25 142)"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/6 w-12 h-12 opacity-15"
        animate={animated ? {
          rotate: -360,
          scale: [1, 1.2, 1],
        } : undefined}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <polygon
            points="20,2 37,12 37,28 20,38 3,28 3,12"
            fill="none"
            stroke="oklch(0.65 0.30 240)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.25 142)" />
            <stop offset="50%" stopColor="oklch(0.65 0.30 240)" />
            <stop offset="100%" stopColor="oklch(0.70 0.28 25)" />
          </linearGradient>
        </defs>
        
        <motion.line
          x1="10%"
          y1="20%"
          x2="90%"
          y2="30%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.line
          x1="20%"
          y1="80%"
          x2="80%"
          y2="70%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
}