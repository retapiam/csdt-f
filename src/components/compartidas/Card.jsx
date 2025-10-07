import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  style = {},
  size = 'medium',
  background = 'white',
  shadow = true
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'large': return 'card-large';
      case 'small': return 'card';
      default: return 'card';
    }
  };

  const defaultStyle = {
    background,
    ...(shadow && {
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    }),
    ...style
  };

  return (
    <div 
      className={`${getSizeClass()} ${className}`}
      style={defaultStyle}
    >
      {children}
    </div>
  );
};

export default Card;
