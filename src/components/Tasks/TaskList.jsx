import React, { useState } from "react";
import TaskCard from "./TaskCard";
import ConfirmModal from "../Modals/ConfirmModal";
import { useTasks } from "./TaskContext"; 

const TaskList = ({ tasks, onEditTask }) => {
  const { deleteTask } = useTasks(); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        There are no tasks to display.
      </div>
    );
  }


  const openDeleteConfirm = (task) => {
    console.log("Opening modal for:", task.title);
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };


  const handleFinalDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => openDeleteConfirm(task)}
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleFinalDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default TaskList;
