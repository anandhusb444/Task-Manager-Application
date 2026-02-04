import React, { useEffect, useState } from 'react'
import Box from './Box';
import AddTaskModal from "./AddTaskModal"
import CompleteModal from '../Modals/CompleteModal';


function Task() {
  const [userTask,setUserTask] = useState([])
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false);

  const token = sessionStorage.getItem("Token")


  useEffect(() => {
    fetch("https://localhost:7094/api/Tasks/Get",{
      headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    })
    .then(respones => {
      if(!respones.ok){
        alert("Unable to retrive tasks for the user")
      }
      return respones.json();
    })
    .then(objData => {setUserTask(objData.data), console.log(objData.data)})
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
  },[])
    
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
        <div className="flex gap-4 overflow-x-auto">
          {userTask.map((task) => ( 
            <Box key={task.taskId} columns={task} />   
          ))}
        <button 
            onClick={CompleteModal(true)}
            className="min-w-[220px] h-fit flex items-center gap-1.5 rounded-lg
            px-3 py-2 text-smtext-slate-500hover:bg-slate-100 border">
              <span className="text-base leading-none">＋</span>
            New group
        </button>
      </div>
    </div>
  </div>
  );
}

export default Task
