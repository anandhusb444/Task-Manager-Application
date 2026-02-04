import React from "react";

export default function CompleteModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[260px] rounded-lg bg-white p-3 text-sm shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-800">Delete task</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <p className="mt-2 text-slate-600">
          Delete this task?
        </p>

        {/* Actions */}
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-2 py-1 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log("Deleted");
              onClose();
            }}
            className="rounded-md bg-red-600 px-2 py-1 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
