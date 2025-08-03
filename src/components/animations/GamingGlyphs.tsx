import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Glyph {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  rotation: number;
}

interface GamingGlyphsProps {
  glyphCount?: number;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'heavy';
  symbols?: string[];
}

export function GamingGlyphs({ 
  glyphCount = 12, 
  className = '',
  intensity = 'subtle',
  symbols = ['<>', '[]', '//', '{}', '++', '##', '=>', '</', '&&', '||', '!=', '===']
}: GamingGlyphsProps) {
  
  const glyphs = useMemo(() => {
    const colors = [
      'oklch(0.75 0.25 142)', // Primary green
      'oklch(0.65 0.30 240)', // Accent blue  
      'oklch(0.70 0.28 25)',  // Secondary orange
      'oklch(0.60 0.25 300)'  // Accent purple
    ];

    const intensitySettings = {
      subtle: { 
        sizeRange: [12, 18], 
        opacityRange: [0.04, 0.08], 
        speedRange: [25, 50],
        pathRange: [100, 200] 
      },
      medium: { 
        sizeRange: [14, 22], 
        opacityRange: [0.06, 0.12], 
        speedRange: [20, 40],
        pathRange: [150, 300] 
      },
      heavy: { 
        sizeRange: [16, 26], 
        opacityRange: [0.08, 0.16], 
        speedRange: [15, 35],
        pathRange: [200, 400] 
      }
    };

    const settings = intensitySettings[intensity];

    return Array.from({ length: glyphCount }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (settings.sizeRange[1] - settings.sizeRange[0]) + settings.sizeRange[0],
      duration: Math.random() * (settings.speedRange[1] - settings.speedRange[0]) + settings.speedRange[0],
      delay: Math.random() * 15,
      opacity: Math.random() * (settings.opacityRange[1] - settings.opacityRange[0]) + settings.opacityRange[0],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360
    }));
  }, [glyphCount, intensity, symbols]);

  const floatVariants = {
    animate: (glyph: Glyph) => ({
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, Math.random() * 15 - 7.5, 0],
      rotate: [glyph.rotation, glyph.rotation + 360],
      scale: [1, 1.1, 0.9, 1],
      opacity: [glyph.opacity, glyph.opacity * 1.8, glyph.opacity * 0.6, glyph.opacity],
      transition: {
        duration: glyph.duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: glyph.delay,
        times: [0, 0.3, 0.7, 1]
      }
    })
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {glyphs.map((glyph) => (
        <motion.div
          key={glyph.id}
          className="absolute font-mono font-medium gaming-glyph select-none"
          style={{
            left: `${glyph.x}%`,
            top: `${glyph.y}%`,
            fontSize: `${glyph.size}px`,
            color: glyph.color,
            textShadow: `0 0 4px ${glyph.color}40`,
            transform: `rotate(${glyph.rotation}deg)`,
          }}
          variants={floatVariants}
          animate="animate"
          custom={glyph}
        >
          {glyph.symbol}
        </motion.div>
      ))}
      
      {/* Additional static gaming elements for depth */}
      <motion.div
        className="absolute top-1/5 right-1/6"
        style={{
          fontSize: '20px',
          color: 'oklch(0.75 0.25 142 / 0.08)',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 6px oklch(0.75 0.25 142 / 0.2)'
        }}
        animate={{
          opacity: [0.03, 0.1, 0.03],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        {'{ }'}
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 left-1/8"
        style={{
          fontSize: '16px',
          color: 'oklch(0.65 0.30 240 / 0.06)',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 4px oklch(0.65 0.30 240 / 0.15)'
        }}
        animate={{
          opacity: [0.04, 0.08, 0.04],
          x: [0, 10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      >
        {'</>'}
      </motion.div>
      
      <motion.div
        className="absolute top-2/3 right-1/3"
        style={{
          fontSize: '14px',
          color: 'oklch(0.70 0.28 25 / 0.05)',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 3px oklch(0.70 0.28 25 / 0.12)'
        }}
        animate={{
          opacity: [0.02, 0.06, 0.02],
          y: [0, -8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
      >
        {'[]'}
      </motion.div>
    </div>
  );
}