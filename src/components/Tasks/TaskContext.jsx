import { createContext, useContext, useState } from "react";

// 1) Context
const TaskContext = createContext(null);

// 2) Provider
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design homepage",
      description: "Create hero section and navigation bar",
      date: "2025-05-20",
      status: "in-progress", // "in-progress" | "completed"
    },
    {
      id: 2,
      title: "Fix login bug",
      description: "Resolve error on invalid credentials",
      date: "2025-05-21",
      status: "completed",
    },
  ]);

  // 3) new task
  const addTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        status: "in-progress",
        ...newTask,
      },
    ]);
  };

  // 4) edit Task
  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  // 5) delete Task
  const deleteTask = (id) => {
    console.log(
      "!!! DANGER: deleteTask function in Context was called for ID:",
      id
    );
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 6) changing state (complete / in-progress)
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "in-progress" : "completed",
            }
          : task
      )
    );
  };

  // 6) search tasks & category

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
   
  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    searchQuery,
    setSearchQuery,
    activeFilter,  
  setActiveFilter
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

