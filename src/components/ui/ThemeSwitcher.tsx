
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // 3D effect with perspective and rotation
  const variants = {
    initial: (isDark: boolean) => ({
      rotateY: isDark ? -90 : 90,
      opacity: 0,
      scale: 0.6,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }
    },
    exit: (isDark: boolean) => ({
      rotateY: isDark ? 90 : -90,
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 0.3,
      }
    })
  };
  
  // Effect to add a light shadow for 3D appearance
  useEffect(() => {
    if (buttonRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate rotation based on mouse position (limited range)
        const maxRotation = 10;
        const rotateX = -y * (maxRotation / (rect.height / 2));
        const rotateY = x * (maxRotation / (rect.width / 2));
        
        // Apply the transformation
        button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      
      const handleMouseLeave = () => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
      };
      
      const button = buttonRef.current;
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <Button 
      ref={buttonRef}
      variant="outline" 
      size="icon" 
      className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 bg-background/80 backdrop-blur-md border-border/50 transition-transform duration-100 ease-out"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="perspective-1000 relative">
        <AnimatePresence mode="wait" initial={false} custom={isDark}>
          {isDark ? (
            <motion.div
              key="moon"
              custom={isDark}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-5 w-5" />
              <span className="sr-only">Light mode</span>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              custom={isDark}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-5 w-5" />
              <span className="sr-only">Dark mode</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};

export default ThemeSwitcher;
