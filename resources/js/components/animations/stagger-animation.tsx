import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface StaggerItemProps {
  children: ReactNode;
  index?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function StaggerContainer({ 
  children, 
  delay = 0, 
  className = '' 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren: 0.05,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  direction = 'up', 
  className = '' 
}: StaggerItemProps) {
  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          ...directionOffset[direction]
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.25, 0.25, 0.75]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
