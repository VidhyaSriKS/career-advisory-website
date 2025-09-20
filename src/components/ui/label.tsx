import React from 'react';

export const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className="block mb-1 font-medium" {...props}>
    {children}
  </label>
);
