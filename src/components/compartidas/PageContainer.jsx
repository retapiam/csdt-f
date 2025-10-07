import React from 'react';

const PageContainer = ({ 
  children, 
  className = '', 
  style = {},
  background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  minHeight = '100vh'
}) => {
  return (
    <div 
      className={`page-container ${className}`}
      style={{
        minHeight,
        background,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
