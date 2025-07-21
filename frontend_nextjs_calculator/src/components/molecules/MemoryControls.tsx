import React from "react";
import Button from "../atoms/Button";

export interface MemoryControlsProps {
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryRecall: () => void;
  onMemoryClear: () => void;
  isMemoryActive: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Memory functions molecule (M+, M-, MR, MC).
 */
const MemoryControls: React.FC<MemoryControlsProps> = ({
  onMemoryAdd,
  onMemorySubtract,
  onMemoryRecall,
  onMemoryClear,
  isMemoryActive,
}) => (
  <div className="flex gap-1 w-full justify-between pb-1">
    <Button
      label="MC"
      variant="function"
      onClick={onMemoryClear}
      ariaLabel="Memory Clear"
      disabled={!isMemoryActive}
    />
    <Button
      label="MR"
      variant="function"
      onClick={onMemoryRecall}
      ariaLabel="Memory Recall"
      disabled={!isMemoryActive}
    />
    <Button label="M+" variant="function" onClick={onMemoryAdd} ariaLabel="Memory Add" />
    <Button label="M-" variant="function" onClick={onMemorySubtract} ariaLabel="Memory Subtract" />
  </div>
);

export default MemoryControls;
