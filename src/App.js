import React, { useState } from 'react';  // Import React and useState hook
import ExportButton from './components/ui/ExportButton';  // Import ExportButton component
import ResumeBuilder from './components/ResumeBuilder';  // Import ResumeBuilder component


// Simple mock components to replace shadcn/ui components
const Input = (props) => <input className="border p-2 rounded w-full" {...props} />;
const Button = ({ children, variant, className, ...props }) => (
  <button 
    className={`p-2 rounded ${variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white'} ${className}`} 
    {...props}
  >
    {children}
  </button>
);
const Textarea = (props) => <textarea className="border p-2 rounded w-full" {...props} />;

// Card components
const Card = ({ children, className }) => <div className={`border rounded shadow p-4 ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;

// Select components
const Select = ({ children, value, onValueChange }) => (
  <select 
    value={value} 
    onChange={(e) => onValueChange(e.target.value)}
    className="border p-2 rounded"
  >
    {children}
  </select>
);

const SelectTrigger = ({ children, className }) => <div className={className}>{children}</div>;

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

const SelectContent = ({ children }) => <>{children}</>;

const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;

// Tabs components
const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  // Clone children and pass activeTab
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsList || child.type === TabsContent) {
        return React.cloneElement(child, { activeTab, setActiveTab });
      }
    }
    return child;
  });
  
  return <div>{childrenWithProps}</div>;
};

const TabsList = ({ children, className, activeTab, setActiveTab }) => {
  // Clone trigger children and pass activeTab
  const triggersWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });
  
  return <div className={`flex ${className}`}>{triggersWithProps}</div>;
};

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button 
    className={`p-2 border-b-2 ${activeTab === value ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};

const App = () => {
  return (
    <div className="App">
      {/* Your ResumeBuilder component */}
      <ResumeBuilder />
    </div>
  );
};

export default App;
