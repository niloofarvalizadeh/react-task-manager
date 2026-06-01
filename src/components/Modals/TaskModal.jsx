import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "../Tasks/TaskContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  XMarkIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// ۱. تعریف قوانین اعتبار‌سنجی (Zod)
const TaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title is too long"),
  description: z.string().optional().default(""),
  status: z.enum(["in-progress", "completed"]).default("in-progress"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  date: z.string().optional(),
});

const todayISO = () => new Date().toISOString().split("T")[0];

const TaskModal = ({
  isOpen,
  onClose,
  mode = "create",
  initialData = null,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const { addTask, updateTask } = useTasks();
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef(null);

  const statusOptions = [
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // ۲. تنظیمات React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TaskSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      status: "in-progress",
      priority: "medium",
      date: todayISO(),
    },
  });

  // مقادیر فعلی برای نمایش در UI
  const currentStatus = watch("status");
  const currentPriority = watch("priority");
  const titleValue = watch("title") || "";

  // مدیریت کلیک بیرون برای بستن Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // مدیریت باز و بسته شدن مودال و Reset فرم
  useEffect(() => {
    if (!isOpen) return;
    setIsClosing(false);

    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        status: "in-progress",
        priority: "medium",
        date: todayISO(),
      });
    }

    // فوکوس خودکار روی اینپوت عنوان
    setTimeout(() => setFocus("title"), 50);
  }, [isOpen, mode, initialData, reset, setFocus]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  // ۳. تابع نهایی ثبت فرم
  const onSubmit = (data) => {
    if (mode === "create") {
      addTask(data);
    } else {
      if (initialData?.id) updateTask(initialData.id, data);
    }
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white w-full max-w-md rounded-[28px] shadow-2xl relative overflow-hidden ${
          isClosing ? "animate-modal-out" : "animate-modal"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 pt-5 pb-4">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
          >
            <XMarkIcon className="size-5" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Task Title
            </label>
            <input
              {...register("title")}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-2xl outline-none transition-all ${
                errors.title
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-gray-100 focus:ring-2 focus:ring-orange-500"
              }`}
              placeholder="What needs to be done?"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="2"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
              placeholder="Add some details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status Dropdown */}
            <div ref={statusRef} className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Status
              </label>
              <button
                type="button"
                onClick={() => setStatusOpen(!statusOpen)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-2xl border border-gray-100 bg-gray-50"
              >
                <span className="text-gray-700 capitalize">
                  {currentStatus.replace("-", " ")}
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    statusOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {statusOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setValue("status", opt.value);
                        setStatusOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 ${
                        currentStatus === opt.value
                          ? "text-orange-600 font-bold bg-orange-50"
                          : "text-gray-700"
                      }`}
                    >
                      {opt.label}
                      {currentStatus === opt.value && (
                        <CheckIcon className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Due Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setValue("priority", p)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all border-2 ${
                    currentPriority === p
                      ? p === "low"
                        ? "bg-green-50 border-green-500 text-green-700"
                        : p === "medium"
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "bg-red-50 border-red-500 text-red-700"
                      : "bg-gray-50 border-transparent text-gray-400"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-200 active:scale-95 transition-all disabled:opacity-50"
            >
              {mode === "create" ? "Add Task" : "Update Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
