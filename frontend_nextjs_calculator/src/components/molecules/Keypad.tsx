import React from "react";
import Button from "../atoms/Button";

/**
 * List of calculator keys to render, with meta for accessibility and styling.
 */
const KEYS: { label: string; aria?: string; variant?: string }[][] = [
  [
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "/", aria: "divide", variant: "operator" },
  ],
  [
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "*", aria: "multiply", variant: "operator" },
  ],
  [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "-", aria: "subtract", variant: "operator" },
  ],
  [
    { label: "0" },
    { label: ".", aria: "decimal" },
    { label: "=", aria: "equals", variant: "accent" },
    { label: "+", aria: "add", variant: "operator" },
  ],
];

/**
 * PUBLIC_INTERFACE
 * Renders calculator keypad.
 */
type KeypadButtonVariant = "primary" | "secondary" | "accent" | "operator" | "function" | undefined;

const Keypad: React.FC<{
  onKeyPress: (keyLabel: string) => void;
}> = ({ onKeyPress }) => (
  <div className="grid grid-cols-4 gap-1 w-full">
    {KEYS.flat().map(({ label, aria, variant }, i) => (
      <Button
        key={label + i}
        label={label}
        ariaLabel={aria || label}
        variant={variant as KeypadButtonVariant}
        onClick={() => onKeyPress(label)}
      />
    ))}
  </div>
);

export default Keypad;
