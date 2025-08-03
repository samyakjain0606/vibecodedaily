import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface TerminalCommand {
  id: string;
  command: string;
  x: number;
  y: number;
  isVisible: boolean;
  isTyping: boolean;
  displayedText: string;
}

interface TerminalStreamProps {
  className?: string;
  commandDelay?: number;
  maxCommands?: number;
}

const DEV_COMMANDS = [
  'git status',
  'npm install',
  'npm run dev',
  'git add .',
  'git commit -m "feat: add new feature"',
  'docker build -t app .',
  'kubectl get pods',
  'yarn build',
  'git push origin main',
  'npm test',
  'docker-compose up -d',
  'git checkout -b feature/new-ui',
  'pnpm run build',
  'git merge main',
  'npm run lint',
  'docker ps -a',
  'git pull origin main',
  'yarn dev',
  'npm run test:coverage',
  'git log --oneline',
  'docker exec -it container bash',
  'kubectl apply -f deployment.yaml',
  'npm run storybook',
  'git rebase -i HEAD~3',
  'yarn add framer-motion',
  'npm run build:prod',
  'git diff HEAD~1',
  'docker stop $(docker ps -q)',
  'npm run deploy',
  'git tag v1.0.0'
];

export function TerminalStream({
  className = '',
  commandDelay = 3000,
  maxCommands = 5
}: TerminalStreamProps) {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const typewriterTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const getRandomPosition = () => {
    // Weighted positioning to favor corners and edges
    const rand = Math.random();
    
    if (rand < 0.4) {
      // Corner positions (40% chance)
      const corner = Math.floor(Math.random() * 4);
      switch (corner) {
        case 0: return { x: 5 + Math.random() * 15, y: 5 + Math.random() * 15 }; // Top-left
        case 1: return { x: 80 + Math.random() * 15, y: 5 + Math.random() * 15 }; // Top-right
        case 2: return { x: 5 + Math.random() * 15, y: 75 + Math.random() * 20 }; // Bottom-left
        case 3: return { x: 80 + Math.random() * 15, y: 75 + Math.random() * 20 }; // Bottom-right
        default: return { x: 10, y: 10 };
      }
    } else if (rand < 0.7) {
      // Edge positions (30% chance)
      const edge = Math.floor(Math.random() * 4);
      switch (edge) {
        case 0: return { x: Math.random() * 90 + 5, y: 5 + Math.random() * 10 }; // Top edge
        case 1: return { x: Math.random() * 90 + 5, y: 85 + Math.random() * 10 }; // Bottom edge
        case 2: return { x: 5 + Math.random() * 10, y: Math.random() * 80 + 10 }; // Left edge
        case 3: return { x: 85 + Math.random() * 10, y: Math.random() * 80 + 10 }; // Right edge
        default: return { x: 10, y: 10 };
      }
    } else {
      // Random positions (30% chance)
      return {
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15
      };
    }
  };

  const getRandomCommand = () => {
    return DEV_COMMANDS[Math.floor(Math.random() * DEV_COMMANDS.length)];
  };

  const createNewCommand = (): TerminalCommand => {
    const position = getRandomPosition();
    return {
      id: `cmd-${Date.now()}-${Math.random()}`,
      command: getRandomCommand(),
      x: position.x,
      y: position.y,
      isVisible: true,
      isTyping: true,
      displayedText: ''
    };
  };

  const typewriteCommand = (commandId: string, fullCommand: string) => {
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex <= fullCommand.length) {
        setCommands(prev => prev.map(cmd => 
          cmd.id === commandId 
            ? { ...cmd, displayedText: fullCommand.slice(0, currentIndex) }
            : cmd
        ));
        currentIndex++;
        
        if (currentIndex <= fullCommand.length) {
          const timeout = setTimeout(typeNextChar, 50 + Math.random() * 50);
          typewriterTimeouts.current.set(commandId, timeout);
        } else {
          // Finished typing, mark as not typing
          setCommands(prev => prev.map(cmd => 
            cmd.id === commandId 
              ? { ...cmd, isTyping: false }
              : cmd
          ));
          
          // Schedule removal after display time
          const removeTimeout = setTimeout(() => {
            setCommands(prev => prev.filter(cmd => cmd.id !== commandId));
            typewriterTimeouts.current.delete(commandId);
          }, 4000 + Math.random() * 2000);
          
          typewriterTimeouts.current.set(`${commandId}-remove`, removeTimeout);
        }
      }
    };

    typeNextChar();
  };

  const addNewCommand = () => {
    setCommands(prev => {
      // Remove oldest commands if we're at max
      const filteredCommands = prev.length >= maxCommands 
        ? prev.slice(1) 
        : prev;
      
      const newCommand = createNewCommand();
      
      // Start typewriter effect
      setTimeout(() => typewriteCommand(newCommand.id, newCommand.command), 100);
      
      return [...filteredCommands, newCommand];
    });
  };

  useEffect(() => {
    // Start with a small delay
    const initialTimeout = setTimeout(() => {
      addNewCommand();
      
      // Set up regular interval
      intervalRef.current = setInterval(addNewCommand, commandDelay);
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Clear all typewriter timeouts
      typewriterTimeouts.current.forEach(timeout => clearTimeout(timeout));
      typewriterTimeouts.current.clear();
    };
  }, [commandDelay]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {commands.map((cmd) => (
          <motion.div
            key={cmd.id}
            className="absolute font-mono text-sm whitespace-nowrap"
            style={{
              left: `${cmd.x}%`,
              top: `${cmd.y}%`,
              filter: 'drop-shadow(0 0 4px oklch(0.75 0.25 142 / 0.3))',
              textShadow: '0 0 8px oklch(0.75 0.25 142 / 0.2)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: cmd.isTyping ? 0.45 : 0.55, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              transition: { duration: 0.8 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-1">
              <span className="text-primary opacity-90 font-semibold">$</span>
              <span className="text-muted-foreground/85">
                {cmd.displayedText}
                {cmd.isTyping && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-primary/80 ml-1"
                    style={{
                      boxShadow: '0 0 4px oklch(0.75 0.25 142)'
                    }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      repeatType: 'reverse' 
                    }}
                  />
                )}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}