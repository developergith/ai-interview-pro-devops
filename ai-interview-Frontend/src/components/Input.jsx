import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-card border border-primary/20
          text-foreground placeholder-muted
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-all duration-300
          ${error ? 'border-accent ring-2 ring-accent/30' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-accent">{error}</p>
      )}
    </div>
  );
};

export default Input;
