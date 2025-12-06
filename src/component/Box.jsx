import React from 'react'
import columns from './col'

function Box({columns}) {
    if (!columns) {
    console.error("Box component received undefined column");
    return null; // avoid crash
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white flex flex-col">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 text-sm">
        <div className="font-medium text-slate-800">{columns.title}</div>
        <div className="text-xs text-slate-400">{columns.count}</div>
        {columns.showNewGroup && (
          <button className="ml-auto text-xs text-slate-500 hover:text-slate-800">
            + New group
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="flex-1 px-4 pb-3 space-y-2">
        {columns.cards.map((text, idx) => (
          <div
            key={idx}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 break-words"
          >
            {text}
          </div>
        ))}

        {/* New page button */}
        <button className="mt-1 inline-flex w-full items-center gap-2 rounded-lg border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
          <span className="text-lg leading-none">＋</span>
          <span>New page</span>
        </button>
      </div>
    </div>
  );
}

export default Box
