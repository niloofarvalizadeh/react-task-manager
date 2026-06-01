import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTasks } from "../../Tasks/TaskContext";


 const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTasks();
  return (
    <div className="relative flex items-center w-64">
      <div className="absolute left-3 text-orange-200">
        <MagnifyingGlassIcon className="h-5 w-5"></MagnifyingGlassIcon>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-orange-500/20
         text-white placeholder-orange-200 rounded-lg focus:outline-none
          focus:ring-2 focus:ring-white transition-all text-sm"
      ></input>
    </div>
  );
};
export default SearchBar;