import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gradient' | 'particles' | 'waves' | 'geometric';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  variant = 'gradient'
}) => {
  const renderBackground = () => {
    switch (variant) {
      case 'gradient':
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            animate={{
              background: [
                "linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff)",
                "linear-gradient(to bottom right, #f0f9ff, #f8fafc, #f3e8ff)",
                "linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10"
                style={{
                  borderRadius: '50%',
                  transform: `scale(${1.5 + i * 0.5})`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1.5 + i * 0.5, 2 + i * 0.5, 1.5 + i * 0.5],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        );
      
      case 'geometric':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-blue-400/20"
                style={{
                  width: `${50 + i * 20}px`,
                  height: `${50 + i * 20}px`,
                  left: `${10 + i * 10}%`,
                  top: `${10 + i * 5}%`,
                }}
                animate={{
                  rotate: [0, 180, 360],
                  borderRadius: ['0%', '50%', '0%'],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {renderBackground()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
