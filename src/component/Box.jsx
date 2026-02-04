import React, { useState } from "react";
import pen from "../assets/Pencile.png";
import Dots from "../assets/threeDots.png";
import CompleteModal from "../Modals/CompleteModal";

function Box({ columns }) {
  if (!columns) return null;

  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [tasks, setTasks] = useState(columns.description ?? []);

  // ✅ modal state
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const descriptionCall = async (textDesc, id) => {
    if (!textDesc.trim()) return;

    const tempData = {
      id: Date.now(),
      description: textDesc,
    };

    setTasks((prev) => [...prev, tempData]);

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
        throw new Error("API failed with status " + response.status);
      }

      setNewValue("");
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <>
      <div className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white p-3 space-y-2">
        <div className="font-medium text-slate-800">{columns.title}</div>

        {tasks.map((d) => (
          <div
            key={d.id}
            className="group relative flex items-center justify-between rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
          >
            <span className="break-words pr-12">{d.description}</span>

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-3 text-slate-400 opacity-0 group-hover:opacity-100">
              <button className="hover:text-slate-700">
                <img src={pen} alt="edit" className="h-3 w-3" />
              </button>

              {/* ✅ FIXED */}
              <button
                className="hover:text-slate-700"
                onClick={() => {
                  setSelectedTask(d);
                  setShowCompleteModal(true);
                }}
              >
                <img src={Dots} alt="menu" className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}

        {isAdding && (
          <div className="flex items-center rounded-lg border border-emerald-200 bg-white px-3 py-2">
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
              placeholder="Enter task..."
              className="w-full text-sm outline-none"
            />
          </div>
        )}

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50"
          >
            <span className="text-lg">＋</span>
            add task
          </button>
        )}
      </div>

      {/* ✅ MODAL RENDER */}
      {showCompleteModal && (
        <CompleteModal
          task={selectedTask}
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
