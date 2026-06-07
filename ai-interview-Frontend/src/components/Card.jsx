import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`
        bg-card rounded-xl border border-primary/10
        shadow-lg shadow-black/20
        transition-all duration-300 hover:shadow-xl hover:shadow-primary/10
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
