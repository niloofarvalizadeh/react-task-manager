import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import  {Header}  from "./components/layout/Header/Header";
import { Sidebar } from "./components/layout/SideBar/Sidebar";
import TaskBoard from "./components/Tasks/TaskBoard";
import TaskModal from "./components/Modals/TaskModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);
const { theme, setTheme } = useTheme();

     const openCreateModal = () => {
       setSelectedTask(null);
       setIsModalOpen(true);
     };

     const openEditModal = (task) => {
       setSelectedTask(task); // دیتای تسک رو برای مودال ذخیره کن
       setIsModalOpen(true);
     };
  return (
    <>
      <MainLayout>
        <Header
          onNewTaskClick={openCreateModal}
          theme={theme}
          setTheme={setTheme}
        />
        <div className="flex h-full min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 bg-gray-50 dark:bg-slate-950">
            <TaskBoard onEditTaskRequest={openEditModal} />
            <TaskModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              initialData={selectedTask}
              mode={selectedTask ? "edit" : "create"}
            />
          </main>
        </div>
      </MainLayout>
    </>
  );
}

export default App;
