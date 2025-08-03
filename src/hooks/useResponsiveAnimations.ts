import { useState, useEffect } from 'react';

interface AnimationSettings {
  duration: number;
  stagger: number;
  intensity: 'light' | 'medium' | 'heavy';
  particleCount: number;
  enableGlitch: boolean;
  enableParticles: boolean;
}

export function useResponsiveAnimations() {
  const [settings, setSettings] = useState<AnimationSettings>({
    duration: 0.8,
    stagger: 0.08,
    intensity: 'medium',
    particleCount: 20,
    enableGlitch: true,
    enableParticles: true
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isSmallScreen = window.innerWidth < 768;
      return isMobileDevice || isSmallScreen;
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // Check for low performance indicators
    const checkPerformance = () => {
      // Check memory if available
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) return true;

      // Check connection if available
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        return true;
      }

      // Check CPU cores (rough estimate)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
      }

      return false;
    };

    const updateSettings = () => {
      const mobile = checkMobile();
      const reducedMotion = checkReducedMotion();
      const lowPerf = checkPerformance();

      setIsMobile(mobile);
      setPrefersReducedMotion(reducedMotion);
      setIsLowPerformance(lowPerf);

      // Adjust settings based on device capabilities
      let newSettings: AnimationSettings = {
        duration: 0.8,
        stagger: 0.08,
        intensity: 'medium',
        particleCount: 20,
        enableGlitch: true,
        enableParticles: true
      };

      if (reducedMotion) {
        // Minimal animations for reduced motion
        newSettings = {
          duration: 0.01,
          stagger: 0,
          intensity: 'light',
          particleCount: 0,
          enableGlitch: false,
          enableParticles: false
        };
      } else if (mobile || lowPerf) {
        // Optimized for mobile/low performance
        newSettings = {
          duration: 0.5,
          stagger: 0.05,
          intensity: 'light',
          particleCount: 8,
          enableGlitch: true,
          enableParticles: true
        };
      } else {
        // Full experience for desktop
        newSettings = {
          duration: 0.8,
          stagger: 0.08,
          intensity: 'medium',
          particleCount: 20,
          enableGlitch: true,
          enableParticles: true
        };
      }

      setSettings(newSettings);
    };

    // Initial check
    updateSettings();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const resizeHandler = () => updateSettings();

    mediaQuery.addEventListener('change', updateSettings);
    window.addEventListener('resize', resizeHandler);

    return () => {
      mediaQuery.removeEventListener('change', updateSettings);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // Letter animation variants that adapt to settings
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 50, 
      rotateX: prefersReducedMotion ? 0 : -90,
      scale: prefersReducedMotion ? 1 : 0.5
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * settings.stagger,
        duration: settings.duration,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    })
  };

  // Container variants that adapt to settings
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: settings.stagger,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  // Optimized transition settings
  const transitions = {
    fast: { duration: settings.duration * 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    normal: { duration: settings.duration, ease: [0.25, 0.1, 0.25, 1] as const },
    slow: { duration: settings.duration * 1.5, ease: [0.25, 0.1, 0.25, 1] as const },
    bounce: prefersReducedMotion 
      ? { duration: settings.duration, ease: [0.25, 0.1, 0.25, 1] as const }
      : { duration: settings.duration, ease: [0.68, -0.55, 0.265, 1.55] as const }
  };

  return {
    settings,
    isMobile,
    isLowPerformance,
    prefersReducedMotion,
    letterVariants,
    containerVariants,
    transitions
  };
}