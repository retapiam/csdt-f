import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  style = {},
  padding = 'section',
  background = 'transparent',
  textAlign = 'left'
}) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'large': return 'section-large';
      case 'small': return 'section-small';
      default: return 'section';
    }
  };

  return (
    <section 
      className={`${getPaddingClass()} ${className}`}
      style={{
        background,
        textAlign,
        ...style
      }}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

export default Section;
