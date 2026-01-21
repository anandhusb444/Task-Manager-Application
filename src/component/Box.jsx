import React, { useState } from "react";
import pen from "../assets/Pencile.png";
import Dots from "../assets/threeDots.png";

function Box({ columns }) {
  if (!columns) return null;

  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  // ✅ keep local copy of tasks so UI updates immediately
  const [tasks, setTasks] = useState(columns.description ?? []);

  // ✅ API call (POST)
  const descriptionCall = async (textDesc, id) => {
    try {
      const response = await fetch(`https://localhost:7094/api/Tasks/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: textDesc,
        }),
      });

      if (!response.ok) {
        throw new Error("API failed with status " + response.status);
      }

      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (err) {
      console.error("API Error:", err);
      return null;
    }
  };

  // ✅ When user presses Enter
  const handleAddTask = async () => {
    const value = newValue.trim();
    if (!value) return;

    // ✅ call API
    const apiResult = await descriptionCall(value, columns.taskId);

    // ✅ update UI immediately (even if API returns nothing)
    setTasks((prev) => [
      ...prev,
      {
        id: apiResult?.id ?? Date.now(), // fallback id if API doesn't return
        description: value,
      },
    ]);

    setNewValue("");
    setIsAdding(false);
  };

  return (
    <div className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      {/* Column title */}
      <div className="font-medium text-slate-800">{columns.title}</div>

      {/* ✅ Task list */}
      {tasks?.map((d) => (
        <div
          key={d.id}
          className="
            group relative
            flex items-center justify-between
            rounded-lg border border-emerald-200 bg-white
            px-3 py-2
            text-sm
            hover:bg-slate-100
          "
        >
          <span className="break-words pr-12">{d.description}</span>

          {/* Actions */}
          <div
            className="
              absolute right-3 top-1/2
              flex -translate-y-1/2 items-center gap-3
              text-slate-400
              opacity-0 group-hover:opacity-100
            "
          >
            <button className="hover:text-slate-700">
              <img src={pen} alt="edit" className="h-3 w-3" />
            </button>

            <button className="hover:text-slate-700 text-lg leading-none">
              <img src={Dots} alt="menu" className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Inline input (shown only when isAdding=true) */}
      {isAdding && (
        <div className="flex items-center rounded-lg border border-emerald-200 bg-white px-3 py-2">
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask(newValue,columns.taskId);
              }
            }}
            onBlur={() => {
              setNewValue("");
              setIsAdding(false);
            }}
            placeholder="Enter task..."
            className="w-full text-sm outline-none placeholder-slate-400"
          />
        </div>
      )}

      {/* ✅ Add task button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="
            flex w-full items-center gap-2
            rounded-lg px-3 py-2
            text-sm font-medium
            text-slate-600
            hover:bg-emerald-50
          "
        >
          <span className="text-lg">＋</span>
          add task
        </button>
      )}
    </div>
  );
}

export default Box;
