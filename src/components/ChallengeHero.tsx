import type { Challenge } from '@/types';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FloatingCodeSnippets } from '@/components/FloatingCodeSnippets';
import { ChallengePreviewCard } from '@/components/ChallengePreviewCard';
import { useState, useEffect } from 'react';

interface ChallengeHeroProps {
  challenge: Challenge;
}

function DifficultyBadge({ difficulty }: { difficulty: Challenge['difficulty'] }) {
  const badges = {
    chill: {
      label: 'Chill',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    },
    deep: {
      label: 'Deep',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    },
    wild: {
      label: 'Wild',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }
  };

  const badge = badges[difficulty];

  return (
    <motion.span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {badge.label}
    </motion.span>
  );
}

export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Cycle through creative examples for inspiration
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % (challenge.examples?.length || 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 min-h-[90vh] flex items-center">
      {/* Floating code snippets background */}
      <FloatingCodeSnippets />
      
      {/* Subtle animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <Container className="py-16 lg:py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* VibeCode Daily Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-4"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans mb-2">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite]">
                  VibeCode
                </span>{' '}
                <span className="text-foreground">Daily</span>
              </h1>
            </motion.div>
            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground font-serif max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              Daily coding challenges that break the rules
            </motion.p>
          </motion.div>

          {/* Date */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-sm font-medium text-muted-foreground"
          >
            {formatDate(challenge.dateCreated)}
          </motion.div>

          {/* Main Challenge Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans text-foreground"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {challenge.title}
              </motion.h2>
              
              <motion.div
                className="flex items-center justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              >
                <DifficultyBadge difficulty={challenge.difficulty} />
                <span className="text-sm text-muted-foreground hidden sm:inline">•</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {challenge.estimatedTime}
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-serif">
                {challenge.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Interactive Challenge Preview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
            className="max-w-2xl mx-auto"
          >
            <ChallengePreviewCard challenge={challenge} />
          </motion.div>

          {/* Inspiration Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            className="space-y-4"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Need inspiration? Here are more weird challenges:
            </p>
            <motion.div
              key={currentExampleIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-muted/30 rounded-lg p-4 max-w-xl mx-auto"
            >
              <p className="text-sm font-medium text-foreground font-serif">
                "{challenge.examples?.[currentExampleIndex] || 'Building amazing things...'}"
              </p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="px-8 py-3 text-base font-semibold">
                Start Challenge 🚀
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="px-8 py-3 text-base font-semibold">
                View Solutions 💡
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}