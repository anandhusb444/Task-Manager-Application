import React from "react";

export default function CompleteModal({ task, onDelete, onClose }) {
  const handleDelete = async () => {
    const token = sessionStorage.getItem("Token");

    if (!task?.id) {
      console.error("Task ID missing");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7094/api/Tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
          },
        }
      );

      if (!response.ok) {
        console.error("Delete failed");
        return;
      }

      onDelete(task.id); // ✅ update UI
      onClose();         // ✅ close modal
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[260px] rounded-lg bg-white p-3 text-sm shadow-lg">
        <div className="flex justify-between">
          <span className="font-medium">Delete task</span>
          <button onClick={onClose}>✕</button>
        </div>

        <p className="mt-2">Delete this task?</p>

        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
