"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaClock, FaUser, FaCheckCircle } from "react-icons/fa";

const TaskStatus = () => {
  const { task, setTask } = useContext(UserContext);
  const columns = [
    { id: "ToDo", title: "To Do", icon: <FaClock className="text-blue-500" /> },
    {
      id: "InProgress",
      title: "In Progress",
      icon: <FaClock className="text-yellow-500" />,
    },
    {
      id: "Done",
      title: "Done",
      icon: <FaCheckCircle className="text-green-500" />,
    },
  ];

  const moveTask = (taskId, fromColumn, toColumn) => {
    setTask((prev) => {
      const updatedTasks = { ...prev };
      const taskIndex = updatedTasks[fromColumn].findIndex(
        (task) => task?.id === taskId
      );
      const [task] = updatedTasks[fromColumn].splice(taskIndex, 1);
      updatedTasks[toColumn].push(task);
      return updatedTasks;
    });
  };

  const Task = ({ task, columns }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { id: task?.id, fromColumn: columns },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`p-4 mb-2 rounded-lg bg-white shadow-md cursor-move ${isDragging ? "opacity-50" : "opacity-100"}`}
      >
        {task?.map((item) => (
          <>
            <h3 className="font-semibold text-gray-800">{item?.projectName}</h3>
            <p className="text-sm text-gray-600 mt-1">{item?.discription}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-sm text-gray-500">
                <FaUser className="mr-1" />
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-1" />
              </div>
            </div>
          </>
        ))}
      </div>
    );
  };

  const Column = ({ title, columns, tasks }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => moveTask(item?.id, item?.fromColumn, column),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    const getColumnColor = () => {
      const colors = {
        todo: "bg-red-100",
        inProgress: "bg-yellow-100",
        review: "bg-blue-100",
        done: "bg-green-100",
      };
      return colors[columns];
    };

    return (
      <div
        ref={drop}
        className={`flex-1 min-w-[300px] mx-2 p-4 rounded-lg ${getColumnColor()} ${isOver ? "ring-2 ring-blue-400" : ""}`}
      >
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {task?.map((item) => (
          <Task key={item?.id} task={item} columns={columns} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex overflow-x-auto gap-4 pb-4">
          <Column title="To Do" column="todo" tasks={columns?.id} />
          <Column title="In Progress" column="inProgress" tasks={columns?.id} />
          <Column title="Done" column="done" tasks={columns?.id} />
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskStatus;

// "use client";
// import React, { useContext, useState } from "react";
// import UserContext from "@/context/UserContext";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { FaClock, FaCheckCircle } from "react-icons/fa";

// const TaskStatus = () => {
//   const { task, setTask } = useContext(UserContext);
//   const columns = [
//     { id: "ToDo", title: "To Do", icon: <FaClock className="text-blue-500" /> },
//     {
//       id: "InProgress",
//       title: "In Progress",
//       icon: <FaClock className="text-yellow-500" />,
//     },
//     {
//       id: "Done",
//       title: "Done",
//       icon: <FaCheckCircle className="text-green-500" />,
//     },
//   ];

//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     const draggedTask = task?.find((task) => task.id === result.draggableId);
//     if (draggedTask) {
//       const updatedTask = {
//         ...draggedTask,
//         taskStatus: destination.droppableId,
//       };
//       const updatedTasks = task?.map((task) =>
//         task.id === draggedTask.id ? updatedTask : task
//       );
//       setTask(updatedTasks);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Project Kanban Board
//       </h1>

//       <DragDropContext onDragEnd={handleDragEnd} >
//         <div className="flex flex-col md:flex-row gap-10">
//           {columns?.map((column,index) => (
//             <div key={column?.id} className="flex-1 min-w-[250px]">
//               <div className="bg-white rounded-lg shadow-lg p-4">
//                 <div className="flex items-center gap-2 mb-4">
//                   {column?.icon}
//                   <h2 className="text-lg font-semibold text-gray-700">
//                     {column?.title}
//                   </h2>
//                 </div>
//                 <Droppable
//                   droppableId={column.id}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className="min-h-[200px] p-2 bg-gray-50 rounded-lg"
//                     >
//                       {task
//                         ?.filter((item) => item.taskStatus === column.id)
//                         ?.map((item, index) => (
//                           <Draggable
//                             key={item?.id}
//                             draggableId={item?.id}
//                             index={index}
//                             isDragDisabled={false}
//                           >
//                             {(provided) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow"
//                               >
//                                 <h3 className="font-semibold text-gray-800 mb-2">
//                                   {item.projectName}
//                                 </h3>
//                                 <p className="text-gray-600 text-sm">
//                                   {item.discription}
//                                 </p>
//                                 <p className="text-gray-600 text-sm">
//                                   {item.priority}
//                                 </p>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskStatus;
