import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import { NervousButton } from '@/components/NervousButton';
import { ChallengeDetailsModal } from '@/components/ChallengeDetailsModal';
import type { Challenge } from '@/types';

interface FeaturedChallengeProps {
  challenge: Challenge;
}

export function FeaturedChallenge({ challenge }: FeaturedChallengeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);


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
      y: 0
    }
  };

  return (
    <motion.section 
      id="todays-challenge"
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
            className="flex justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="font-brand hover:border-primary hover:text-primary"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Interactive Challenge Demo */}
          <motion.div 
            id="interactive-demo"
            className="max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <div className="bg-muted/30 rounded-lg p-8 border text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary font-brand">
                  Example Challenge Preview
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try our "Nervous Button" - a UI component that gets anxious when you try to click it.
                  Move your mouse closer and watch it panic!
                </p>
              </div>
              
              <div className="flex justify-center py-4">
                <NervousButton
                  variant="default"
                  size="lg"
                  className="font-medium text-base"
                  onClick={() => {
                    alert('🎉 Wow! You actually managed to click me! You must have nerves of steel.');
                  }}
                >
                  Try to click me!
                </NervousButton>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Challenge Details Modal */}
      <ChallengeDetailsModal
        challenge={challenge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.section>
  );
}