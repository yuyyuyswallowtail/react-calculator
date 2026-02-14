import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "destructive";
  className?: string;
}

export default function CalculatorButton({
  label,
  onClick,
  variant = "secondary",
  className = "",
}: Props) {
  const baseClasses = "w-full h-14 rounded-2xl font-semibold text-sm shadow-md";

  let variantClasses = "";

  switch (variant) {
    case "default":
      variantClasses =
        "text-white hover:bg-secondary hover:text-foreground border-2 bg-background";
      break;
    case "destructive":
      variantClasses = "bg-red-600 text-white hover:bg-red-700";
      break;
    case "secondary":
    default:
      variantClasses =
        "bg-secondary text-primary hover:bg-foreground hover:text-background";
      break;
  }

  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      className={
        label === "=" ? "select-none col-span-2 -col-end-1" : "select-none"
      }
    >
      <Button
        variant="default"
        className={`${baseClasses} ${variantClasses} ${className} transition-colors duration-150`}
        onClick={onClick}
      >
        {label}
      </Button>
    </motion.div>
  );
}
