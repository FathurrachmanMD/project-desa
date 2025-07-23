import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTyping = () => {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);

      return () => clearTimeout(timer);
    };

    if (delay > 0 && currentIndex === 0) {
      const delayTimer = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      return startTyping();
    }
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {cursor && (
        <motion.span
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};
