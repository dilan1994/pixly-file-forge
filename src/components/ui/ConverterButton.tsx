import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ConverterButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  gradient?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ConverterButton = ({ 
  children, 
  onClick, 
  className,
  variant = "ghost",
  size = "sm",
  disabled = false,
  gradient,
  isActive = false,
  icon,
  style,
  ...props 
}: ConverterButtonProps) => {
  // Gradient color mapping
  const getGradientColors = (gradientClass: string) => {
    const gradientMap: Record<string, string> = {
      'from-blue-500 to-purple-600': 'linear-gradient(135deg, #3b82f6, #9333ea)',
      'from-green-500 to-teal-600': 'linear-gradient(135deg, #10b981, #0d9488)',
      'from-cyan-500 to-blue-600': 'linear-gradient(135deg, #06b6d4, #2563eb)',
      'from-orange-500 to-red-600': 'linear-gradient(135deg, #f97316, #dc2626)',
      'from-pink-500 to-rose-600': 'linear-gradient(135deg, #ec4899, #e11d48)',
      'from-indigo-500 to-purple-600': 'linear-gradient(135deg, #6366f1, #9333ea)',
      'from-emerald-500 to-green-600': 'linear-gradient(135deg, #10b981, #16a34a)',
      'from-amber-500 to-orange-600': 'linear-gradient(135deg, #f59e0b, #ea580c)',
      'from-violet-500 to-purple-600': 'linear-gradient(135deg, #8b5cf6, #9333ea)',
      'from-sky-500 to-cyan-600': 'linear-gradient(135deg, #0ea5e9, #0891b2)',
      'from-lime-500 to-green-600': 'linear-gradient(135deg, #84cc16, #16a34a)',
      'from-fuchsia-500 to-pink-600': 'linear-gradient(135deg, #d946ef, #db2777)'
    };
    return gradientMap[gradientClass] || 'linear-gradient(135deg, #3b82f6, #6366f1)';
  };

  // Base button style for gradient buttons
  const gradientButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    minWidth: '140px',
    maxWidth: '180px',
    height: '48px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    background: gradient ? getGradientColors(gradient) : undefined,
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  // Active button additional styling
  const activeButtonStyle: React.CSSProperties = {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-1px)'
  };

  // If gradient is provided, use custom styling
  if (gradient) {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        style={{
          ...gradientButtonStyle,
          ...(isActive ? activeButtonStyle : {})
        }}
        className={cn("relative overflow-hidden", className)}
        whileHover={{ 
          scale: disabled ? 1 : 1.05,
          y: disabled ? 0 : -2
        }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span style={{ width: '1rem', height: '1rem', flexShrink: 0 }}>
            {icon}
          </span>
        )}
        
        {/* Text Content */}
        <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
          {children}
        </span>

        {/* Hover Glow Effect */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}
          className="hover:opacity-100"
        />
      </motion.button>
    );
  }

  // Default shadcn/ui Button for non-gradient cases
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-foreground hover:text-primary transition-all duration-300 ease-in-out hover:shadow-md",
        className
      )}
      style={style}
      {...props}
    >
      {icon && <span className="w-4 h-4 mr-2">{icon}</span>}
      {children}
    </Button>
  );
};
