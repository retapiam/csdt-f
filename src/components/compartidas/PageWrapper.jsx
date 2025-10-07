import React from 'react';

const PageWrapper = ({ children, className = '', style = {} }) => {
  return (
    <div 
      className={`page-content ${className}`} 
      style={{ 
        position: 'relative', 
        zIndex: 1,
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
