import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  loading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-2.5 rounded-xl font-medium transition-all duration-300 active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/50',
    secondary: 'bg-card border border-primary/30 text-foreground hover:border-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
    accent: 'bg-gradient-to-r from-accent to-pink-600 text-white hover:shadow-lg hover:shadow-accent/50',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
