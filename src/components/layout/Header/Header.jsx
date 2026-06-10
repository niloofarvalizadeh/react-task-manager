import React from "react";
import MenuTrigger from "./MenuTrigger";
import  AppTitle  from "./AppTitle";
import SearchBar  from "./SearchBar";
import  NewTaskButton  from "./NewTaskButton";

export const Header = ({ onNewTaskClick, theme, setTheme }) => {
  return (
    <div className="flex flex-col gap-3 bg-amber-500 p-4 dark:bg-slate-900 shadow-md">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MenuTrigger />
          <AppTitle />
        </div>

        <div className="flex items-center gap-2">
 
          <div className="hidden md:flex items-center rounded-xl bg-white/15 p-1 dark:bg-white/10">
            <button
              onClick={() => setTheme("light")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                theme === "light" ? "bg-white text-slate-900" : "text-white"
              }`}
            >
              {" "}
              Light{" "}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                theme === "dark" ? "bg-slate-950 text-white" : "text-white"
              }`}
            >
              {" "}
              Dark{" "}
            </button>
          </div>

          <NewTaskButton onClick={onNewTaskClick} />
        </div>
      </div>

  
      <div className="w-full md:max-w-xs md:absolute md:left-1/2 md:-translate-x-1/2">
        <SearchBar />
      </div>
    </div>
  );
};

