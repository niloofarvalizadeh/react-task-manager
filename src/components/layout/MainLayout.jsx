const MainLayout = ({ children }) => {
  return (
    <div className="min-h-dvh bg-gray-300 dark:bg-slate-950 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10 flex justify-center">
      <div
        className="
          w-full
          max-w-[420px] sm:max-w-3xl lg:max-w-7xl 2xl:max-w-[1600px]
          bg-white dark:bg-slate-900
          rounded-3xl shadow-2xl overflow-hidden
          min-h-[85vh] flex flex-col
          border border-white/80 dark:border-white/10
        "
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
