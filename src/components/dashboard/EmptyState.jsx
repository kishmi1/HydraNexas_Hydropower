import { FileText, Inbox, AlertCircle } from "lucide-react";

const EmptyState = ({ 
  icon = "inbox", 
  title = "No data found", 
  description = "There are no items to display at this time.",
  action = null,
  className = "" 
}) => {
  const icons = {
    inbox: Inbox,
    file: FileText,
    alert: AlertCircle,
  };
  
  const Icon = icons[icon] || Inbox;
  
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="w-16 h-16 mb-4 text-slate-300">
        <Icon size={64} />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 max-w-md">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

const TableEmpty = ({ 
  colSpan, 
  message = "No data available", 
  description = null 
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 mb-3 text-slate-300">
            <Inbox size={48} />
          </div>
          <p className="text-sm font-medium text-slate-600">{message}</p>
          {description && (
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EmptyState;
export { TableEmpty };