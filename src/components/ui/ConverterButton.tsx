
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConverterButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export const ConverterButton = ({ 
  children, 
  onClick, 
  className,
  variant = "ghost",
  size = "sm",
  disabled = false,
  ...props 
}: ConverterButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-foreground hover:text-primary transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
