import React, { useState } from "react";

function Box({ columns }) {
  if (!columns) return null;
  
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (!newValue.trim()) return;
    setItems([...items, newValue.trim()]);
    console.log(items)
    setNewValue("");
    setIsAdding(false);
  };

  return (
    <div
      className="
        w-full sm:w-[320px]
        rounded-xl border border-slate-200bg-white p-3 space-y-2">
        <div className="font-medium text-slate-800">{columns.title}</div>
        <div
          key={columns.taskId}
          className="
            flex items-center justify-between
            rounded-lg border border-emerald-200 bg-white
            px-3 py-3 sm:py-2
            text-sm">
          <span className="break-words">{columns.description}</span>
          {/* Actions */}
          <div
            className="
              flex items-center gap-3
              text-slate-400
              sm:opacity-0 sm:group-hover:opacity-100">
            <button className="hover:text-slate-700 text-base">✏️</button>
            <button className="hover:text-slate-700 text-base">⋯</button>
          </div>
        </div>

      {/* Inline input */}
      {isAdding && (
        <div
          className="
            flex items-center
            rounded-lg border border-emerald-200 bg-white
            px-3 py-3 sm:py-2
          "
        >
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            onBlur={() => { setNewValue(""); setIsAdding(false)}}
            placeholder="Enter task..."
            className="
              w-full text-sm
              outline-none placeholder-slate-400
            "
          />
        </div>
      )}

      {/* + New page */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="
            flex w-full items-center gap-2
            rounded-lg px-3 py-3 sm:py-2
            text-sm font-medium 
            hover:bg-emerald-50"
        >
          <span className="text-lg">＋</span>
          add task
        </button>
      )}
    </div>
  );
}

export default Box;
