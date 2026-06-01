import React from "react";
import MenuTrigger from "./MenuTrigger";
import  AppTitle  from "./AppTitle";
import SearchBar  from "./SearchBar";
import  NewTaskButton  from "./NewTaskButton";

export const Header = ({ onNewTaskClick, theme, setTheme }) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-amber-500 p-4 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <MenuTrigger />
        <AppTitle />
      </div>

      <div className="flex items-center gap-3">
        <SearchBar />

        <div className="flex items-center rounded-xl bg-white/15 p-1 dark:bg-white/10">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              theme === "light"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            Light
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              theme === "dark"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            Dark
          </button>
        </div>

        <NewTaskButton onClick={onNewTaskClick} />
      </div>
    </div>
  );
};
