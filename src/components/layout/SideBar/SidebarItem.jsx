import React from 'react';

const SidebarItem = ({icon: Icon, label, active= false, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-amber-500/10 text-amber-500 "
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
        >{Icon && <Icon className="w-5 h-5 text-orange-500" />}
        <span>{label}</span>
      </button>
    );
}

export default SidebarItem;