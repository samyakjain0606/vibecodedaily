import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import type { Challenge } from '@/types';

interface FeaturedChallengeProps {
  challenge: Challenge;
}

export function FeaturedChallenge({ challenge }: FeaturedChallengeProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.section 
      className="py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <div className="space-y-8">
          {/* Section Header */}
          <motion.div 
            className="text-center space-y-3"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Target className="w-4 h-4" />
              Today's Challenge
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-foreground">
              Ready to break some rules?
            </h2>
          </motion.div>

          {/* Featured Challenge Card */}
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <ChallengeCard challenge={challenge} variant="featured" />
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            variants={itemVariants}
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto font-brand font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-primary hover:glow-primary"
            >
              Start Challenge
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto font-brand hover:border-primary hover:text-primary"
            >
              View Details
            </Button>
          </motion.div>

          {/* Code Examples Preview */}
          {challenge.examples && challenge.examples.length > 0 && (
            <motion.div 
              className="max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <div className="bg-muted/30 rounded-lg p-6 border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 font-brand uppercase tracking-wide">
                  Code Snippets to Get You Started
                </h3>
                <div className="space-y-2">
                  {challenge.examples.slice(0, 3).map((example, index) => (
                    <div 
                      key={index}
                      className="font-mono text-sm bg-card/50 rounded px-3 py-2 text-foreground/80 border"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </motion.section>
  );
}