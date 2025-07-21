import React from "react";

/**
 * PUBLIC_INTERFACE
 * For accessible, visually-hidden labels.
 */
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

export default VisuallyHidden;
