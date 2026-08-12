import { Plus } from "lucide-react";
import Button from "./Button";

const PageHeader = ({ 
  title, 
  description, 
  action = null,
  actionText = "Add New",
  actionIcon = Plus,
  breadcrumbs = null,
  className = "" 
}) => {
  return (
    <div className={`mb-8 flex items-center justify-between ${className}`}>
      <div className="flex-1">
        {breadcrumbs && (
          <nav className="flex text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-slate-400">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-slate-700 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-slate-700 font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}
        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-slate-500">
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <div className="flex-shrink-0 ml-6">
          {typeof action === "function" ? (
            <Button variant="primary" icon={actionIcon}>
              {action()}
            </Button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              {action}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;