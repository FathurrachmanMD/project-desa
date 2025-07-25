// Animation utilities untuk efek kreatif yang cepat
import { Variants } from "framer-motion";

// Durasi animasi cepat untuk user experience yang smooth
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Fade In Animations
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: "easeOut"
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 30,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0,
    y: -30,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0,
    x: -30,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0,
    x: 30,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

// Scale Animations
export const scaleIn: Variants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: "easeOut"
    }
  }
};

export const scaleInBounce: Variants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "backOut"
    }
  }
};

// Stagger Children Animation
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: "easeOut"
    }
  }
};

// Slide Animations
export const slideInFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

export const slideInFromTop: Variants = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

// Rotate & Scale
export const rotateScale: Variants = {
  hidden: {
    rotate: -180,
    scale: 0,
    opacity: 0,
  },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

// Card Hover Animation
export const cardHover = {
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: "easeOut"
    }
  }
};

// Button Animations
export const buttonPress = {
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  whileHover: { 
    scale: 1.05,
    transition: { duration: ANIMATION_DURATION.fast }
  }
};

export const buttonFloat = {
  whileHover: { 
    y: -3,
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: { duration: ANIMATION_DURATION.fast }
  }
};

// Loading Spinner
export const spinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Page Transition
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    x: 300,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -300,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeIn"
    }
  }
};

// Modal Animation
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.fast,
    }
  }
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  }
};

// Notification/Toast Animation
export const notification: Variants = {
  hidden: {
    opacity: 0,
    x: 300,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 300,
    scale: 0.8,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: "easeIn"
    }
  }
};
