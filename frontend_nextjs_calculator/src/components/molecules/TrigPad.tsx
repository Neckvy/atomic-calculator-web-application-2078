import React from "react";
import Button from "../atoms/Button";

/**
 * PUBLIC_INTERFACE
 * Trigonometric function buttons (sin, cos, tan).
 */
const TrigPad: React.FC<{
  onTrig: (func: "sin" | "cos" | "tan") => void;
}> = ({ onTrig }) => (
  <div className="flex gap-1.5 w-full justify-between mb-1">
    <Button label="sin" variant="secondary" onClick={() => onTrig("sin")} ariaLabel="Sine" />
    <Button label="cos" variant="secondary" onClick={() => onTrig("cos")} ariaLabel="Cosine" />
    <Button label="tan" variant="secondary" onClick={() => onTrig("tan")} ariaLabel="Tangent" />
  </div>
);

export default TrigPad;
