import React from 'react';

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className="border rounded p-2 w-full" {...props} />
);
