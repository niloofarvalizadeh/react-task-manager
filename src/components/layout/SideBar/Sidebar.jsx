import React from "react";
import CategoryList from "./CategoryList";
import { useTasks } from "../../Tasks/TaskContext";
import { useState } from "react";

export const Sidebar = () => {
  const { activeFilter, setActiveFilter } = useTasks();
  const [activeCategory, setActiveCategory] = useState("all");

  // 2. حالا مستقیماً فیلتر سراسری را آپدیت می‌کنیم
  const handleCategoryChange = (id) => {
    setActiveFilter(id);
    console.log("Active category switched to:", id);
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full p-4">
      {/* category items */}
      <CategoryList
        activeCategory={activeFilter}
        onCategoryChange={handleCategoryChange}
      />

      {/* push footer to bottom */}
      {/* <div className="mt-auto">
        <FooterActions
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div> */}
    </div>
  );
};
