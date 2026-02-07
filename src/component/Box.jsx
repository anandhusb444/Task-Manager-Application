import React, { useState } from "react";
import pen from "../assets/Pencile.png";
import Dots from "../assets/threeDots.png";
import CompleteModal from "../Modals/CompleteModal";

function Box({ columns }) {
  if (!columns) return null;

  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [tasks, setTasks] = useState(columns.description ?? []);

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 🔹 Add task
  const descriptionCall = async (textDesc, id) => {
    if (!textDesc.trim()) return;

    const tempTask = {
      id: Date.now(), // temporary UI id
      description: textDesc,
    };

    setTasks((prev) => [...prev, tempTask]);

    try {
      const response = await fetch(
        `https://localhost:7094/api/Tasks/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: textDesc }),
        }
      );

      if (!response.ok) {
        throw new Error("Create failed");
      }

      setNewValue("");
      setIsAdding(false);
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // 🔹 Delete task (called from modal)
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setShowCompleteModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white p-3 space-y-2">
        <div className="font-medium text-slate-800">{columns.title}</div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="group relative flex items-center justify-between rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
          >
            <span className="break-words pr-12">
              {task.description}
            </span>

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-3 opacity-0 group-hover:opacity-100">
              <button>
                <img src={pen} alt="edit" className="h-3 w-3" />
              </button>

              <button
                onClick={() => {
                  setSelectedTask(task);
                  setShowCompleteModal(true);
                }}
              >
                <img src={Dots} alt="menu" className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}

        {isAdding && (
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                descriptionCall(newValue, columns.taskId);
              }
            }}
            onBlur={() => {
              setNewValue("");
              setIsAdding(false);
            }}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Enter task..."
          />
        )}

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50"
          >
            + add task
          </button>
        )}
      </div>

      {showCompleteModal && (
        <CompleteModal
          task={selectedTask}
          onDelete={handleDeleteTask}
          onClose={() => {
            setShowCompleteModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
}

export default Box;
