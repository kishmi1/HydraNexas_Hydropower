const StatusBadge = ({ status, variant = "default", size = "md", className = "" }) => {
  const baseClasses = "inline-flex items-center font-semibold rounded-full uppercase tracking-wide";
  
  const variantClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-slate-100 text-slate-700",
    published: "bg-green-100 text-green-800",
    draft: "bg-amber-100 text-amber-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-slate-100 text-slate-700",
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    featured: "bg-blue-100 text-blue-800",
    normal: "bg-slate-100 text-slate-700",
    yes: "bg-green-100 text-green-800",
    no: "bg-slate-100 text-slate-700",
    ongoing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };
  
  const badgeClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size]} ${className}`;
  
  return <span className={badgeClasses}>{status}</span>;
};

export default StatusBadge;