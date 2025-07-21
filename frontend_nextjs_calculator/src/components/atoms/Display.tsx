import React from "react";

type DisplayProps = {
  value: string;
  memory?: string;
};

/**
 * PUBLIC_INTERFACE
 * Display atom for calculator — shows current input or result.
 */
const Display: React.FC<DisplayProps> = ({ value, memory }) => (
  <div
    className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 rounded-md p-4 text-right min-h-[3rem] shadow-inner flex flex-col items-end border border-zinc-700"
    role="status"
    aria-live="polite"
    data-testid="calculator-display"
    tabIndex={0}
  >
    {memory && (
      <span className="text-xs text-cyan-400 font-mono mb-0.5" aria-label="Memory">
        {memory}
      </span>
    )}
    <span className="text-2xl font-mono select-text break-all" aria-label="Current value">
      {value}
    </span>
  </div>
);

export default Display;
