import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl animate-modal">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <ExclamationTriangleIcon className="size-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        <p className="text-gray-500 mb-6 ml-1">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-[2] py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-100 active:scale-95 transition-all"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
