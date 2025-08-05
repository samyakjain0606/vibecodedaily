import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { GlitchText, ParticleBackground, GamingButton, HexagonalBackground, GamingGlyphs, TerminalStream } from '@/components/animations';
import { useResponsiveAnimations } from '@/hooks';

export function BrandHero() {
  const { settings, letterVariants, containerVariants, transitions, prefersReducedMotion } = useResponsiveAnimations();
  
  const scrollToTodaysChallenge = () => {
    const element = document.getElementById('todays-challenge');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


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

  // Funny text animation variants
  const funnyTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 1.8 // After the main subtitle
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  // Split text into individual letters
  const splitText = (text: string) => {
    return text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Non-breaking space
      index
    }));
  };

  // Split text into words for word-by-word animation
  const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => ({
      word,
      index
    }));
  };

  const vibeCodeLetters = splitText('VIBECODE');
  const dailyLetters = splitText('DAILY');
  const funnyTextWords = splitIntoWords("Making developers go 'Wait, that actually works?' since 2025");

  return (
    <section className="min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
      {/* Layer 1: Terminal Command Stream - Left Side */}
      <div className="absolute left-0 top-0 h-full w-1/3 overflow-hidden">
        <TerminalStream 
          commandDelay={2500}
          maxCommands={4}
          className="opacity-65"
        />
      </div>
      
      {/* Layer 1b: Terminal Command Stream - Right Side */}
      <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
        <TerminalStream 
          commandDelay={3000}
          maxCommands={3}
          className="opacity-45"
        />
      </div>
      
      {/* Layer 2: Gaming glyphs - Positioned on sides */}
      <div className="absolute left-0 top-0 h-full w-1/4">
        <GamingGlyphs 
          glyphCount={settings.particleCount ? Math.min(settings.particleCount / 4, 4) : 3}
          intensity={settings.intensity === 'light' ? 'subtle' : settings.intensity}
          className="opacity-80"
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-1/4">
        <GamingGlyphs 
          glyphCount={settings.particleCount ? Math.min(settings.particleCount / 4, 4) : 3}
          intensity={settings.intensity === 'light' ? 'subtle' : settings.intensity}
          className="opacity-60"
        />
      </div>
      
      {/* Layer 3: Enhanced particle background */}
      {settings.enableParticles && (
        <ParticleBackground 
          intensity={settings.intensity === 'light' ? 'subtle' : settings.intensity} 
          particleCount={settings.particleCount}
          className="opacity-60" 
        />
      )}
      
      {/* Layer 4: Hexagonal background pattern */}
      <HexagonalBackground 
        density="medium" 
        animated={!prefersReducedMotion}
        opacity={0.15}
        className="opacity-60"
      />
      
      {/* Layer 5: Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-blue/5" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      </div>
      
      {/* Layer 6: Gaming geometric decorations */}
      <div className="absolute inset-0 opacity-35">
        <div className="absolute top-1/4 left-8 w-0.5 h-16 bg-primary/60 gaming-bracket" />
        <div className="absolute top-1/4 right-8 w-0.5 h-16 bg-primary/60 gaming-bracket" />
        <div className="absolute bottom-1/4 left-12 w-8 h-0.5 bg-accent-blue/60" />
        <div className="absolute bottom-1/4 right-12 w-8 h-0.5 bg-accent-blue/60" />
      </div>
      
      {/* Center content protection overlay */}
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-transparent via-background/10 to-transparent z-10" />
      
      <Container>
        <div className="text-center space-y-8 relative z-20 mx-auto max-w-4xl px-4 sm:px-8">
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
                    className="inline-block text-brand-gradient-enhanced gaming-glow-enhanced"
                    variants={letterVariants}
                    custom={i}
                    style={{
                      filter: !prefersReducedMotion ? 'drop-shadow(0 4px 8px oklch(0.75 0.25 142 / 0.2))' : 'none'
                    }}
                  >
                    {settings.enableGlitch ? (
                      <GlitchText
                        intensity={settings.intensity === 'subtle' ? 'light' : settings.intensity}
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
              Daily challenges that make coding{' '}
              <span className="text-primary font-semibold">feel alive again</span>
            </p>
            
            <motion.p 
              className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto"
              variants={funnyTextVariants}
              initial="hidden"
              animate="visible"
            >
              {funnyTextWords.map((wordObj, i) => (
                <motion.span
                  key={`funny-word-${i}`}
                  className="inline-block mr-2"
                  variants={wordVariants}
                >
                  {wordObj.word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="space-y-8 pt-12"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GamingButton
                variant="primary"
                size="lg"
                onClick={scrollToTodaysChallenge}
                className="font-brand text-lg tracking-wide"
              >
                TODAY'S CHALLENGE
              </GamingButton>
              
              <GamingButton
                variant="ghost"
                size="lg"
                onClick={() => window.open('https://x.com', '_blank')}
                className="font-brand text-lg tracking-wide"
                scanLine={false}
              >
                POST ON X
              </GamingButton>
            </div>
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