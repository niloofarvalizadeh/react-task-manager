import React from "react";

export default function LayoutToggle({ value = "compact", onChange }) {
  return (
    <div className="inline-flex items-center rounded-full bg-black/15 p-1 ring-1 ring-black/10">
      <button
        type="button"
        onClick={() => onChange?.("compact")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          value === "compact"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-white/90 hover:bg-white/15",
        ].join(" ")}
      >
        Compact
      </button>

      <button
        type="button"
        onClick={() => onChange?.("wide")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          value === "wide"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-white/90 hover:bg-white/15",
        ].join(" ")}
      >
        Wide
      </button>
    </div>
  );
}
