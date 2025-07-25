import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Animated Button
interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, 'whileHover' | 'whileTap'> {
  variant?: 'bounce' | 'scale' | 'float' | 'glow' | 'premium';
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'scale',
  children,
  className = '',
  ...props
}) => {
  const getHoverAnimation = () => {
    switch (variant) {
      case 'bounce':
        return {
          y: -5,
          transition: { type: "spring" as const, stiffness: 400, damping: 17 }
        };
      case 'scale':
        return {
          scale: 1.05,
          transition: { duration: 0.2 }
        };
      case 'float':
        return {
          y: -3,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          transition: { duration: 0.2 }
        };
      case 'glow':
        return {
          boxShadow: "0 0 25px rgba(51, 71, 91, 0.4)",
          scale: 1.02,
          y: -2,
          transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }
        };
      case 'premium':
        return {
          scale: 1.05,
          y: -3,
          boxShadow: "0 10px 30px rgba(51, 71, 91, 0.3)",
          transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }
        };
      default:
        return { scale: 1.05 };
    }
  };

  return (
    <motion.button
      className={className}
      whileHover={getHoverAnimation()}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Animated Card
interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, 'whileHover'> {
  hover?: boolean;
  children: React.ReactNode;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  hover = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        transition: { duration: 0.2 }
      } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  color = 'border-blue-600'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`border-2 border-gray-300 ${color} border-t-transparent rounded-full ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Pulse Animation
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  scale?: [number, number];
  duration?: number;
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  className = '',
  scale = [1, 1.05],
  duration = 2
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: scale,
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Slide In Animation
interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className = '',
  direction = 'left',
  delay = 0
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, opacity: 0 };
      case 'right': return { x: 100, opacity: 0 };
      case 'up': return { y: -100, opacity: 0 };
      case 'down': return { y: 100, opacity: 0 };
      default: return { x: -100, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};
