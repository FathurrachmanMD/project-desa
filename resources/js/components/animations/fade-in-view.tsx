import React from 'react';
import { motion } from 'framer-motion';

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.3,
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 20 };
      case 'down': return { opacity: 0, y: -20 };
      case 'left': return { opacity: 0, x: -20 };
      case 'right': return { opacity: 0, x: 20 };
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: 20 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': 
      case 'down': return { opacity: 1, y: 0 };
      case 'left': 
      case 'right': return { opacity: 1, x: 0 };
      case 'none': return { opacity: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};
