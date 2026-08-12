import { forwardRef } from "react";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false, 
  className = "", 
  icon: Icon = null,
  iconPosition = "left",
  asChild = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-5 py-3 text-base rounded-xl",
  };
  
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon size={iconSize[size]} className="mr-2" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSize[size]} className="ml-2" />
      )}
    </>
  );
  
  if (asChild) {
    return (
      <span className={buttonClasses} ref={ref} {...props}>
        {content}
      </span>
    );
  }
  
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export default Button;