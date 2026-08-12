const LoadingState = ({ message = "Loading...", size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
  };
  
  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  
  return (
    <div className={`flex flex-col items-center justify-center p-12 ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4`}></div>
      <p className={`${textClasses[size]} text-slate-500`}>{message}</p>
    </div>
  );
};

const TableLoading = ({ rows = 5, cols = 4 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-slate-100">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingState;
export { TableLoading };