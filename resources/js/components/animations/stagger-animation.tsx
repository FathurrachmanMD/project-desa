import React from 'react';
import { motion } from 'framer-motion';

interface StaggerAnimationProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  itemDelay?: number;
}

export const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  itemDelay = 0
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: itemDelay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0,
          y: 20,
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut"
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
