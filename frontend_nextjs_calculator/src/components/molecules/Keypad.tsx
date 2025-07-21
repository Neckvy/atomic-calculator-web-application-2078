import React from "react";
import Button from "../atoms/Button";

/**
 * List of calculator keys to render, with meta for accessibility and styling.
 */
/**
 * C/AC button will be top-left, similar to calculator conventions.
 * Responsive grid via Tailwind: 4 columns on all, but padding and gap are responsive.
 */
const KEYS: { label: string; aria?: string; variant?: string }[][] = [
  [
    { label: "C", aria: "clear", variant: "function" }, // clear button
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
 * 
 * Props:
 * - onKeyPress: Handler for number/operator keys.
 * - onClear: Handler for the clear/all clear button.
 */
type KeypadButtonVariant = "primary" | "secondary" | "accent" | "operator" | "function" | undefined;

interface KeypadProps {
  onKeyPress: (keyLabel: string) => void;
  onClear?: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onClear }) => (
  <div className="grid grid-cols-5 sm:grid-cols-5 gap-1 sm:gap-2 w-full 
                  px-1 py-2 sm:px-3 sm:py-3
                  ">
    {KEYS.flat().map(({ label, aria, variant }, i) =>
      label === "C" ? (
        <Button
          key={label + i}
          label={label}
          ariaLabel={aria || label}
          variant={variant as KeypadButtonVariant}
          onClick={() => {
            if (onClear) onClear();
          }}
        />
      ) : (
        <Button
          key={label + i}
          label={label}
          ariaLabel={aria || label}
          variant={variant as KeypadButtonVariant}
          onClick={() => onKeyPress(label)}
        />
      )
    )}
  </div>
);

export default Keypad;
