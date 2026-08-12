import { forwardRef } from "react";

const FormLabel = ({ children, required = false, className = "" }) => {
  return (
    <label className={`block mb-2 text-sm font-medium text-slate-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

const FormInput = forwardRef(({ 
  className = "", 
  error = false,
  ...props 
}, ref) => {
  const inputClasses = `w-full px-4 py-3 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
  } ${className}`;
  
  return <input ref={ref} className={inputClasses} {...props} />;
});

FormInput.displayName = "FormInput";

const FormTextarea = forwardRef(({ 
  className = "", 
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  const textareaClasses = `w-full px-4 py-3 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical disabled:opacity-60 disabled:cursor-not-allowed ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
  } ${className}`;
  
  return <textarea ref={ref} className={textareaClasses} rows={rows} {...props} />;
});

FormTextarea.displayName = "FormTextarea";

const FormSelect = forwardRef(({ 
  children, 
  className = "", 
  error = false,
  ...props 
}, ref) => {
  const selectClasses = `w-full px-4 py-3 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
  } ${className}`;
  
  return (
    <select ref={ref} className={selectClasses} {...props}>
      {children}
    </select>
  );
});

FormSelect.displayName = "FormSelect";

const FormCheckbox = forwardRef(({ 
  className = "", 
  error = false,
  label,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center">
      <input
        ref={ref}
        type="checkbox"
        className={`w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 ${
          error ? 'border-red-300' : ''
        } ${className}`}
        {...props}
      />
      {label && (
        <label className="ml-2 text-sm text-slate-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});

FormCheckbox.displayName = "FormCheckbox";

const FormGroup = ({ children, className = "" }) => {
  return <div className={`mb-6 ${className}`}>{children}</div>;
};

const FormGrid = ({ children, className = "", cols = 2 }) => {
  const gridClasses = `grid gap-6 ${cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-1'} ${className}`;
  return <div className={gridClasses}>{children}</div>;
};

const FormContainer = ({ children, className = "", title = "" }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-8 shadow-sm ${className}`}>
      {title && <h2 className="text-2xl font-bold text-slate-800 mb-6">{title}</h2>}
      {children}
    </div>
  );
};

const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
};

const FormHelper = ({ text }) => {
  if (!text) return null;
  return (
    <p className="mt-1 text-xs text-slate-500">
      {text}
    </p>
  );
};

export {
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormGroup,
  FormGrid,
  FormContainer,
  FormError,
  FormHelper,
};