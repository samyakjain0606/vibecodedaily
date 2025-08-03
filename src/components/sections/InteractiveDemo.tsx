import { motion } from 'framer-motion';
import { Rocket, Code, Play, ExternalLink } from 'lucide-react';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';

export function InteractiveDemo() {
  const demoVariants = {
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

  const codeSnippets = [
    '// Nervous button implementation',
    'const [nervousness, setNervousness] = useState(0);',
    '',
    'const handleMouseMove = (e) => {',
    '  const distance = calculateDistance(e, buttonRef);',
    '  setNervousness(Math.max(0, 100 - distance));',
    '};',
    '',
    'return (',
    '  <motion.button',
    '    animate={{',
    '      x: nervousness > 50 ? jitter : 0,',
    '      scale: nervousness > 80 ? 0.95 : 1',
    '    }}',
    '    className="nervous-btn"',
    '  >',
    '    {nervousness > 90 ? "Please no..." : "Click me!"}',
    '  </motion.button>',
    ');'
  ];

  return (
    <motion.section 
      className="py-16 lg:py-24"
      variants={demoVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div 
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-[oklch(0.70_0.28_25)] text-sm font-medium">
              <Rocket className="w-4 h-4" />
              See It In Action
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-foreground">
              Watch Challenges Come to Life
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive demos and live code examples to inspire your creativity
            </p>
          </motion.div>

          {/* Demo Container */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 items-center"
            variants={itemVariants}
          >
            {/* Code Preview */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-brand">
                <Code className="w-4 h-4" />
                Live Code Preview
              </div>
              
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">
                      nervous-button.tsx
                    </span>
                  </div>
                </div>
                
                <div className="p-4 font-mono text-sm space-y-1 max-h-80 overflow-y-auto">
                  {codeSnippets.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        line.trim() === '' ? 'h-4' : '',
                        line.startsWith('//') ? 'text-muted-foreground italic' : 'text-foreground',
                        line.includes('const') || line.includes('return') ? 'text-[oklch(0.75_0.25_142)]' : '',
                        line.includes('useState') || line.includes('motion') ? 'text-[oklch(0.65_0.30_240)]' : ''
                      )}
                    >
                      {line || '\u00A0'}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Demo Area */}
            <div className="space-y-6">
              <div className="bg-muted/20 rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center min-h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold font-brand">Interactive Demo Coming Soon</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Live, interactive challenge previews will be available here soon
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-brand hover:border-primary hover:text-primary"
                  >
                    Try Challenge
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground font-mono">
                Future features: Live code editor, real-time preview, community solutions
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}