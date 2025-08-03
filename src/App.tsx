import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { BrandHero } from '@/components/sections/BrandHero';
import { FeaturedChallenge } from '@/components/sections/FeaturedChallenge';
import { ChallengeBrowser } from '@/components/sections/ChallengeBrowser';
import { InteractiveDemo } from '@/components/sections/InteractiveDemo';
import { todaysChallenge, sampleChallenges } from '@/data/sampleChallenge';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Section 1: Brand Hero */}
          <BrandHero />
          
          {/* Section 2: Featured Challenge */}
          <FeaturedChallenge challenge={todaysChallenge} />
          
          {/* Section 3: Challenge Browser */}
          <ChallengeBrowser challenges={sampleChallenges} />
          
          {/* Section 4: Interactive Demo */}
          <InteractiveDemo />
        </main>
        
        {/* Footer */}
        <footer className="border-t border-border/40 bg-muted/30">
          <Container>
            <div className="py-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 VibeCode Daily. Built for creative developers who break the rules.</p>
              <p className="mt-2 text-xs">
                Created by <a href="https://x.com/Samyak0606" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Samyak</a> • <a href="https://github.com/samyakjain0606/vibecodedaily" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              </p>
            </div>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App
