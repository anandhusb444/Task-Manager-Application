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

  // Edit state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const token = sessionStorage.getItem("Token")

  /* ---------------- ADD TASK ---------------- */
  const descriptionCall = async (textDesc, id) => {
    if (!textDesc.trim()) return;

    const tempTask = {
      id: Date.now(), // temporary UI id
      description: textDesc,
    };

    // optimistic UI
    setTasks((prev) => [...prev, tempTask]);
    setNewValue("");
    setIsAdding(false);

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
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  /* ---------------- UPDATE TASK ---------------- */
  const updateTask = async (taskId, textDesc) => {
    if (!textDesc.trim()) return;

    // optimistic UI
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, description: textDesc } : t
      )
    );

    setEditingTaskId(null);
    setEditValue("");

    try {
      const response = await fetch(
        `https://localhost:7094/api/Tasks/${taskId}`,
        {
          method: "PATCH",
          Authorization: `Bearer ${token}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: textDesc }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }
    }
    catch(err)
    {
        console.log(err)
    }
  };

  /* ---------------- DELETE TASK ---------------- */
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setShowCompleteModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white p-3 space-y-2">
        <div className="font-medium text-slate-800">
          {columns.title}
        </div>

        {/* TASK LIST */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group relative flex items-center justify-between rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
          >
            {/* VIEW / EDIT */}
            {editingTaskId === task.id ? (
              <input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    updateTask(task.id, editValue);
                  }
                  if (e.key === "Escape") {
                    setEditingTaskId(null);
                    setEditValue("");
                  }
                }}
                className="w-full rounded border px-2 py-1 text-sm"
              />
            ) : (
              <span className="break-words pr-12">
                {task.description}
              </span>
            )}

            {/* ACTION BUTTONS */}
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-3 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditValue(task.description);
                }}
              >
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

        {/* ADD INPUT */}
        {isAdding && (
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                descriptionCall(newValue, columns.taskId);
              }
              if (e.key === "Escape") {
                setIsAdding(false);
                setNewValue("");
              }
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

      {/* DELETE MODAL */}
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