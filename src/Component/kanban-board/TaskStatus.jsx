"use client";
import React, { useContext, useState } from "react";
import UserContext from "@/context/UserContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaClock, FaCheckCircle } from "react-icons/fa";

const TaskStatus = () => {
  const { task } = useContext(UserContext); // Your task data comes from UserContext
  const [editingTask, setEditingTask] = useState(task); // Local state for tasks

  // Column configuration
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

  const handleDragEnd = (result) => {
    // const { source, destination } = result;

    // If dropped outside a valid destination or in the same position
    // if (
    //   !destination ||
    //   (source.droppableId === destination.droppableId &&
    //     source.index === destination.index)
    // ) {
    //   return;
    // }

    // Copy the current task list to avoid direct mutation
    // const tasks = Array.from(editingTask);

    // Remove the dragged task from its source position
    // const [movedTask] = tasks.splice(source.index, 1);

    // Update the task's status based on the destination column
    // movedTask.taskStatus = destination.droppableId;

    // Insert the task into its new position in the destination column
    // tasks.splice(destination.index, 0, movedTask);

    // Update the state with the modified tasks
    setEditingTask(tasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Project Kanban Board
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-10">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-[250px]">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  {column.icon}
                  <h2 className="text-lg font-semibold text-gray-700">
                    {column.title}
                  </h2>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[200px] p-2 bg-gray-50 rounded-lg"
                    >
                      {editingTask
                        .filter((item) => item.taskStatus === column.id)
                        .map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow"
                              >
                                <h3 className="font-semibold text-gray-800 mb-2">
                                  {item.projectName}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {item.discription}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {item.priority}
                                </p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskStatus;
