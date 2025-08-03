import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { GlitchText, ParticleBackground, GamingButton, HexagonalBackground } from '@/components/animations';
import { useResponsiveAnimations } from '@/hooks';
import { useState, useEffect } from 'react';

export function BrandHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings, letterVariants, containerVariants, transitions, prefersReducedMotion } = useResponsiveAnimations();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const subtitleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1, 
      transition: { 
        ...transitions.normal,
        delay: prefersReducedMotion ? 0 : 1.5
      } 
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        ...transitions.normal,
        delay: prefersReducedMotion ? 0 : 2.2
      } 
    }
  };

  // Split text into individual letters
  const splitText = (text: string) => {
    return text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Non-breaking space
      index
    }));
  };

  const vibeCodeLetters = splitText('VIBECODE');
  const dailyLetters = splitText('DAILY');

  return (
    <section className="min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
      {/* Enhanced particle background */}
      {settings.enableParticles && (
        <ParticleBackground 
          intensity={settings.intensity} 
          particleCount={settings.particleCount}
          className="opacity-60" 
        />
      )}
      
      {/* Hexagonal background pattern */}
      <HexagonalBackground 
        density="medium" 
        animated={!prefersReducedMotion}
        opacity={0.08}
        className="opacity-40"
      />
      
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-blue/5" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      </div>
      
      {/* Gaming geometric decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-8 w-0.5 h-16 bg-primary/60 gaming-bracket" />
        <div className="absolute top-1/4 right-8 w-0.5 h-16 bg-primary/60 gaming-bracket" />
        <div className="absolute bottom-1/4 left-12 w-8 h-0.5 bg-accent-blue/60" />
        <div className="absolute bottom-1/4 right-12 w-8 h-0.5 bg-accent-blue/60" />
      </div>
      
      <Container>
        <div className="text-center space-y-8 relative z-10">
          {/* Enhanced brand title with letter-by-letter animation */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-brand leading-none">
              {/* VIBECODE */}
              <div className="mb-2">
                {vibeCodeLetters.map((letter, i) => (
                  <motion.span
                    key={`vibe-${i}`}
                    className="inline-block text-brand-gradient gaming-glow"
                    variants={letterVariants}
                    custom={i}
                    style={{
                      textShadow: !prefersReducedMotion ? '0 0 30px oklch(0.75 0.25 142 / 0.4)' : 'none',
                      filter: !prefersReducedMotion ? 'drop-shadow(0 4px 8px oklch(0.75 0.25 142 / 0.2))' : 'none'
                    }}
                  >
                    {settings.enableGlitch ? (
                      <GlitchText
                        intensity={settings.intensity}
                        triggerOnHover={true}
                        delay={prefersReducedMotion ? 0 : i * 100 + 3000} // Auto-glitch after initial animation
                      >
                        {letter.char}
                      </GlitchText>
                    ) : (
                      letter.char
                    )}
                  </motion.span>
                ))}
              </div>
              
              {/* DAILY */}
              <div>
                {dailyLetters.map((letter, i) => (
                  <motion.span
                    key={`daily-${i}`}
                    className="inline-block text-foreground"
                    variants={letterVariants}
                    custom={vibeCodeLetters.length + i}
                    style={{
                      filter: !prefersReducedMotion ? 'drop-shadow(0 2px 4px oklch(0 0 0 / 0.3))' : 'none'
                    }}
                  >
                    {letter.char}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced subtitle */}
          <motion.div
            className="space-y-4 max-w-4xl mx-auto"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-medium">
              Daily coding challenges that{' '}
              <span className="text-primary font-semibold">break the rules</span>
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Weird, wonderful, and surprisingly practical exercises for creative developers
            </p>
          </motion.div>
          
          {/* Gaming-style CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <GamingButton
              variant="primary"
              size="lg"
              className="font-brand text-lg tracking-wide"
            >
              START CHALLENGE
            </GamingButton>
            
            <GamingButton
              variant="ghost"
              size="lg"
              className="font-brand text-lg tracking-wide"
              scanLine={false}
            >
              BROWSE ARCHIVE
            </GamingButton>
          </motion.div>
          
          {/* Gaming stats/info */}
          <motion.div
            className="pt-12 text-sm text-muted-foreground/60 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 3, duration: 1 }}
          >
            <div className="flex justify-center items-center gap-8 font-mono">
              <span>[ DIFFICULTY: ADAPTIVE ]</span>
              <span>[ STATUS: ACTIVE ]</span>
              <span>[ PLAYERS: ∞ ]</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}