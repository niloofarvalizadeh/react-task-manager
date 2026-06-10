import React from "react";
import {
  CalendarIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isCompleted = task.status === "completed";
  return (
    <div className="bg-white hover:bg-amber-200/50 p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
      {/* title  */}
      <div className="flex-1 flex flex-col gap-1 w-full">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{task.description}</p>
      </div>
      {/* details & Date*/}
      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 w-full md:w-auto">
        <span
          className={`px-4 py-2 text-xs rounded-md ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-amber-500/10 text-amber-500"
          }`}
        >
          {isCompleted ? "completed" : "In Progress"}
        </span>
        <div className="flex items-center pt-1">
          <CalendarIcon className="size-5 mx-1" />
          <span className="text-xs text-gray-400">{task.date}</span>
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-end md:justify-center gap-2 w-full md:w-auto">
        <button onClick={onEdit} className="text-gray-400 hover:text-blue-600">
          <PencilSquareIcon className="size-6" />
        </button>
        <button
          onClick={() => {
            console.log("Internal Card: Trash Clicked for task", task.id);
            onDelete();
          }}
          className="text-gray-400 hover:text-red-600"
        >
          <TrashIcon className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
