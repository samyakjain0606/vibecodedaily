import { Container } from '@/components/Container';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-14 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              VC
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">VibeCode</span>
              <span className="text-xs text-muted-foreground font-medium -mt-1">Daily</span>
            </div>
          </div>

          {/* Navigation - hidden on mobile for now, can be expanded later */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a 
              href="#" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Today's Challenge
            </a>
            <a 
              href="#" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Archive
            </a>
            <a 
              href="#" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Stats
            </a>
          </nav>

          {/* Right side placeholder for future features */}
          <div className="flex items-center">
            {/* Reserved for user menu, notifications, etc. */}
          </div>
        </div>
      </Container>
    </header>
  );
}