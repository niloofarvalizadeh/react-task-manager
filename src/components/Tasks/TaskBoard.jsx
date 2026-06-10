
import { useTasks } from "./TaskContext";
import TaskList from "./TaskList";

const TaskBoard = ({ onEditTaskRequest }) => {
  const { tasks, searchQuery, activeFilter } = useTasks();

 
    ;
  const filteredTasks = tasks.filter((task) => {
    const searchContent = searchQuery.toLowerCase();

    // ۱. بررسی جستجو
    const matchesSearch =
      task.title.toLowerCase().includes(searchContent) ||
      task.description.toLowerCase().includes(searchContent);

    // ۲. بررسی فیلتر دسته‌بندی
    let matchesFilter = true;
    if (activeFilter === "in-progress") {
      matchesFilter = task.status === "in-progress";
    } else if (activeFilter === "completed") {
      matchesFilter = task.status === "completed";
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="w-full h-full p-6">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {" "}
          {activeFilter === "all"
            ? "All Tasks"
            : activeFilter === "completed"
            ? "Completed Tasks"
            : "In Progress Tasks"}
        </h2>
        <p className="text-xs text-gray-400">
          {filteredTasks.length} task{filteredTasks.length === 1 ? "" : "s"}{" "}
          found
        </p>
      </header>
      <TaskList
        tasks={filteredTasks}
        onEditTask={(task) => onEditTaskRequest(task)}
      />
    </section>
  );
};

export default TaskBoard;
