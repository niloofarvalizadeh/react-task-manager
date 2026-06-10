import React from "react";
import CategoryList from "./CategoryList";
import { useTasks } from "../../Tasks/TaskContext";

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeFilter, setActiveFilter } = useTasks();

  const handleCategoryChange = (id) => {
    setActiveFilter(id);
    console.log("Active category switched to:", id);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-full p-4
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:flex md:flex-col
      `}
      >
        <div className="flex items-center justify-between md:hidden mb-4 border-b pb-2">
          <span className="font-bold text-gray-700">Categories</span>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>

        <CategoryList
          activeCategory={activeFilter}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </>
  );
};
