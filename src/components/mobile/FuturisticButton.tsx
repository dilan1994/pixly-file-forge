import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FuturisticButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  pulse?: boolean;
  ripple?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  pulse = false,
  ripple = false,
  size = 'md',
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
    
    if (onClick) onClick();
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-500 hover:from-blue-500/30 hover:to-blue-600/30',
    secondary: 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-500 hover:from-purple-500/30 hover:to-purple-600/30',
    success: 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30 text-green-500 hover:from-green-500/30 hover:to-green-600/30',
    info: 'bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-500 hover:from-cyan-500/30 hover:to-cyan-600/30',
    warning: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-500 hover:from-amber-500/30 hover:to-amber-600/30'
  };

  const buttonClasses = [
    'relative inline-flex items-center justify-center gap-2 border rounded-xl font-semibold cursor-pointer transition-all duration-300 overflow-hidden backdrop-blur-sm',
    sizeClasses[size],
    variantClasses[variant],
    pulse && 'animate-pulse',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
      {...props}
    >
      {/* Gradient Flow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isClicked ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Ripple Effect */}
      {ripple && isClicked && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}; 