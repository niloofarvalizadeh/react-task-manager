import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";

const FooterActions = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="border-t border-gray-200 pt-4 space-y-2">
      <SidebarItem
        icon={Cog6ToothIcon}
        label="Settings"
        active={activeCategory === "settings"}
        onClick={() => onCategoryChange?.("settings")}
      />
      <SidebarItem
        icon={TrashIcon}
        label="Trash"
        active={activeCategory === "trash"}
        onClick={() => onCategoryChange?.("trash")}
      />
    </div>
  );
};

export default FooterActions;
