import { forwardRef } from "react";
import { Trash2, Pencil } from "lucide-react";

const IconButton = forwardRef(({ 
  icon: Icon, 
  variant = "default", 
  size = "md", 
  disabled = false, 
  className = "", 
  tooltip = "",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-slate-500",
    edit: "text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500",
    delete: "text-red-600 hover:bg-red-50 hover:text-red-700 focus:ring-red-500",
    success: "text-green-600 hover:bg-green-50 hover:text-green-700 focus:ring-green-500",
    warning: "text-amber-600 hover:bg-amber-50 hover:text-amber-700 focus:ring-amber-500",
  };
  
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };
  
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Fallback icon based on variant
  const DefaultIcon = variant === "delete" ? Trash2 : variant === "edit" ? Pencil : null;
  const IconComponent = Icon || DefaultIcon;
  
  if (!IconComponent) {
    return null;
  }
  
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled}
      title={tooltip}
      {...props}
    >
      <IconComponent size={iconSize[size]} />
    </button>
  );
});

IconButton.displayName = "IconButton";

export default IconButton;