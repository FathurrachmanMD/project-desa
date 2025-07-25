import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp, scaleIn, staggerContainer, staggerItem } from '@/lib/animations';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'scaleIn' | 'stagger';
  delay?: number;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0
}) => {
  const getVariants = () => {
    switch (animation) {
      case 'fadeInUp': return fadeInUp;
      case 'scaleIn': return scaleIn;
      case 'stagger': return staggerContainer;
      default: return fadeIn;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={staggerItem}
  >
    {children}
  </motion.div>
);

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hover = true
}) => (
  <motion.div
    className={className}
    variants={scaleIn}
    initial="hidden"
    animate="visible"
    whileHover={hover ? {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.2 }
    } : undefined}
  >
    {children}
  </motion.div>
);

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => (
  <motion.button
    type={type}
    className={className}
    onClick={onClick}
    disabled={disabled}
    whileTap={{ scale: 0.95 }}
    whileHover={{ 
      scale: disabled ? 1 : 1.05,
      y: disabled ? 0 : -2,
      boxShadow: disabled ? undefined : "0 8px 25px rgba(0,0,0,0.15)"
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.button>
);

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  className = '',
  threshold = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = ''
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

interface ModalAnimationProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

export const ModalAnimation: React.FC<ModalAnimationProps> = ({
  children,
  isOpen,
  onClose,
  className = ''
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />
        <motion.div
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${className}`}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`border-2 border-gray-300 border-t-blue-600 rounded-full ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

interface NotificationProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export const NotificationAnimation: React.FC<NotificationProps> = ({
  children,
  isVisible,
  className = ''
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className={className}
        initial={{ opacity: 0, x: 300, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
