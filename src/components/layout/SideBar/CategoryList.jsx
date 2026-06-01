import React from "react";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";

const CategoryList = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "all", label: "All Tasks", icon: ClipboardDocumentListIcon },
    { id: "in-progress", label: "In Progress", icon: ClockIcon },
    { id: "completed", label: "Completed", icon: CheckCircleIcon },
  ];

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <SidebarItem
          key={category.id}
          icon={category.icon}
          label={category.label}
          active={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
