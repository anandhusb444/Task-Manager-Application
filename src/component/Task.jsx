import React from 'react'
import Box from './Box';
import columns from './col'
import checkImg from "../assets/check.png";


function Task() {
    
  return (
     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">
          Task Manager  
        </h1>

        {/* Top controls row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          {/* Left view/filter controls */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
              <span className="text-sm material-symbols-outlined">view_week</span>
              <span className="font-medium">Calendar view</span>
            </button>
            <button className="text-slate-800 flex items-center gap-x-1 hover:text-slate-800">
              <span className='text-sm material-symbols-outlined'>check</span>
              Completed
            </button>
            <button className="inline-flex items-center gap-1 text-slate-800">
              <span className='text-sm material-symbols-outlined'>cancel</span>
              Not Completed
            </button>
          </div>
        </div>

         {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {columns.map((col) => (
            <Box key={col.id} columns={col} />   
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task
