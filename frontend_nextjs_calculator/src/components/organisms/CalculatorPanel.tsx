import React, { useState, useCallback, useRef, useEffect } from "react";
import Display from "../atoms/Display";
import MemoryControls from "../molecules/MemoryControls";
import Keypad from "../molecules/Keypad";
import TrigPad from "../molecules/TrigPad";

const INITIAL_STATE = {
  display: "0",
  memory: "",
};

type TrigOp = "sin" | "cos" | "tan";

/**
 * PUBLIC_INTERFACE
 * Main Calculator organism: combines Display, Keypad, Memory, Trig controls.
 */
const CalculatorPanel: React.FC = () => {
  const [displayValue, setDisplayValue] = useState(INITIAL_STATE.display);
  const [pendingOp, setPendingOp] = useState<null | string>(null);
  const [operand, setOperand] = useState<null | number>(null);
  const [memory, setMemory] = useState<string>("");
  const [overwrite, setOverwrite] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // Simple arithmetic operation evaluation (for demonstration)
  const handleKeyPress = useCallback(
    (key: string) => {
      if (/^\d$/.test(key)) {
        if (displayValue === "0" || overwrite) {
          setDisplayValue(key);
          setOverwrite(false);
        } else {
          setDisplayValue(displayValue + key);
        }
      } else if (key === ".") {
        if (!displayValue.includes(".")) {
          setDisplayValue(displayValue + ".");
        }
      } else if (["+", "-", "*", "/"].includes(key)) {
        setOperand(parseFloat(displayValue));
        setPendingOp(key);
        setOverwrite(true);
      } else if (key === "=") {
        if (pendingOp && operand != null) {
          const second = parseFloat(displayValue);
          let result = 0;
          switch (pendingOp) {
            case "+": result = operand + second; break;
            case "-": result = operand - second; break;
            case "*": result = operand * second; break;
            case "/": result = second === 0 ? NaN : operand / second; break;
          }
          setDisplayValue(String(result));
          setOperand(null);
          setPendingOp(null);
          setOverwrite(true);
        }
      }
    },
    [displayValue, operand, pendingOp, overwrite]
  );

  // Trigonometric functions (assuming input in degrees for demo)
  const handleTrig = useCallback(
    (func: TrigOp) => {
      const value = parseFloat(displayValue);
      const radians = (value * Math.PI) / 180;
      let trigResult = "";
      switch (func) {
        case "sin":
          trigResult = String(Math.sin(radians));
          break;
        case "cos":
          trigResult = String(Math.cos(radians));
          break;
        case "tan":
          trigResult = String(Math.tan(radians));
          break;
      }
      setDisplayValue(trigResult);
      setOverwrite(true);
    },
    [displayValue]
  );

  // Memory controls
  const handleMemoryAdd = useCallback(() => {
    setMemory(String((parseFloat(memory) || 0) + parseFloat(displayValue)));
  }, [memory, displayValue]);

  const handleMemorySubtract = useCallback(() => {
    setMemory(String((parseFloat(memory) || 0) - parseFloat(displayValue)));
  }, [memory, displayValue]);

  const handleMemoryRecall = useCallback(() => {
    if (memory !== "") setDisplayValue(memory);
    setOverwrite(true);
  }, [memory]);

  const handleMemoryClear = useCallback(() => {
    setMemory("");
  }, []);

  // Keyboard accessibility: map keyboard events to calculator functions
  const keyboardHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      if (
        /^\d$/.test(e.key) ||
        ["+", "-", "*", "/", "=", "Enter", ".", "Backspace", "Delete"].includes(e.key)
      ) {
        e.preventDefault();
        if (e.key === "Enter") handleKeyPress("=");
        else if (e.key === "Backspace") setDisplayValue("0");
        else if (e.key === "Delete") {
          setDisplayValue("0");
          setMemory("");
          setOperand(null);
          setPendingOp(null);
        }
        else handleKeyPress(e.key);
      }
      if (["s", "c", "t"].includes(e.key.toLowerCase())) {
        if (e.key === "s") handleTrig("sin");
        else if (e.key === "c") handleTrig("cos");
        else if (e.key === "t") handleTrig("tan");
      }
      if (["m", "M"].includes(e.key)) {
        // Memory functions: M = recall, Shift+M = clear
        if (e.shiftKey) handleMemoryClear();
        else handleMemoryRecall();
      }
    },
    [
      handleKeyPress,
      handleTrig,
      handleMemoryRecall,
      handleMemoryClear,
      setDisplayValue,
      setMemory,
      setOperand,
      setPendingOp,
    ]
  );

  useEffect(() => {
    // Attach keydown handler to panel/listen globally if focused
    const handler = (e: KeyboardEvent) => keyboardHandler(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyboardHandler]);

  // Handler for Clear/All Clear button
  const handleClear = useCallback(() => {
    setDisplayValue("0");
    setOperand(null);
    setPendingOp(null);
    setMemory("");
    setOverwrite(false);
  }, []);

  // Improved responsive classNames for calculator panel with Tailwind
  // Responsive: width auto on mobile (mx-2), larger on tablet (sm:max-w-md), more-padding on desktop (md:p-8)
  return (
    <div
      ref={panelRef}
      className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto p-2 sm:p-6 md:p-8 
                 bg-zinc-950/90 dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 
                 flex flex-col gap-2 items-stretch 
                 transition-all duration-200
                 "
      aria-label="Calculator panel"
      tabIndex={0}
    >
      <Display value={displayValue} memory={memory !== "" ? memory : undefined} />
      <TrigPad onTrig={handleTrig} />
      <MemoryControls
        onMemoryAdd={handleMemoryAdd}
        onMemorySubtract={handleMemorySubtract}
        onMemoryRecall={handleMemoryRecall}
        onMemoryClear={handleMemoryClear}
        isMemoryActive={memory !== ""}
      />
      <Keypad onKeyPress={handleKeyPress} onClear={handleClear} />
    </div>
  );
};

export default CalculatorPanel;
