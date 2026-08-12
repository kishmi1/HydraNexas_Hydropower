const Table = ({ 
  children, 
  className = "", 
  hover = true,
  striped = false,
  bordered = true 
}) => {
  const tableClasses = `w-full border-collapse ${className}`;
  
  return (
    <table className={tableClasses}>
      {children}
    </table>
  );
};

const TableHeader = ({ children, className = "" }) => {
  return (
    <thead className={`bg-slate-100 ${className}`}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = "", hover = true, striped = false }) => {
  const bodyClasses = className;
  
  return (
    <tbody className={bodyClasses}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = "", hover = true }) => {
  const rowClasses = `border-b border-slate-100 transition-colors ${hover ? 'hover:bg-slate-50' : ''} ${className}`;
  
  return (
    <tr className={rowClasses}>
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = "", align = "left" }) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  
  const headClasses = `px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider ${alignClasses[align]} ${className}`;
  
  return (
    <th className={headClasses}>
      {children}
    </th>
  );
};

const TableCell = ({ children, className = "", align = "left" }) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  
  const cellClasses = `px-4 py-3 text-sm text-slate-700 ${alignClasses[align]} ${className}`;
  
  return (
    <td className={cellClasses}>
      {children}
    </td>
  );
};

const TableContainer = ({ children, className = "" }) => {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Container = TableContainer;

export default Table;