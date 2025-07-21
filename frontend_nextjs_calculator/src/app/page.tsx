"use client";

import React from "react";
import CalculatorPanel from "@/components/organisms/CalculatorPanel";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr dark:from-zinc-950 dark:to-zinc-800 from-slate-900 to-zinc-900 py-12 px-3">
      <CalculatorPanel />
    </div>
  );
}
