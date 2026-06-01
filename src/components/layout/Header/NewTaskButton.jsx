import { PlusIcon } from "@heroicons/react/24/outline";

 const NewTaskButton = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-5 py-2 bg-white text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-white
       focus:ring-offset-2 focus:ring-offset-orange-500 "
      >
        <PlusIcon className="h-5 w-5 text-orange-500"></PlusIcon>
        <span className="text-sm font-medium tracking-wide">New</span>
      </button>
    </div>
  );
};
export default NewTaskButton;