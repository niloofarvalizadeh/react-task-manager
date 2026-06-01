import { Bars3Icon } from "@heroicons/react/24/outline";

const MenuTrigger = () => {
  return (
    <div>
      <button className="p-2 text-white hover:bg-orange-600 rounded-md transition-colors duration-200 focus:outline-none">
        <Bars3Icon className="h-6 w-6"></Bars3Icon>
      </button>
    </div>
  );
};
export default MenuTrigger;
