import React from 'react';
import { ChevronDown, X, CheckSquare } from "lucide-react";

const TasksListView = ({ 
  tasks, 
  projectMembers,
  openDropdownId, 
  setOpenDropdownId, 
  handleAssigneeChange,
  handleStatusChange,
  getStatusColor, 
  handleTaskClick,
  confirmDeleteTask,
  handleConfirmDelete,
  handleCancelDelete,
  taskToDelete,
  isOwner,
  statusOptions = ['Todo', 'In Progress','Done'] // Default status options
}) => {
  const DeleteConfirmationModal = ({ task, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the task "{task.taskName}"? 
                    This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  if (tasks.length === 0) {
    return (
      <EmptyState
            icon={CheckSquare}
            title="No tasks assigned"
            description="There are currently no tasks."
            className="bg-white rounded-lg m-8 p-8"
          />
    );
  }
    return (
      <div className="container mx-auto px-4 py-8 mb-32">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Tasks</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto pb-32">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {isOwner && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete
                </th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {task.taskName}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {task.taskDescription}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      {isOwner ?  <button
                        onClick={() => setOpenDropdownId(prevId => 
                          prevId === `assignee-${task.id}` ? null : `assignee-${task.id}`
                        )}
                        className="w-48 px-4 py-2 text-sm text-left bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex items-center justify-between">
                          <span>{task.assignee?.firstName || "Assign to..."}</span>
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </div>
                      </button> : <div className="text-sm text-gray-500">
                          <span>{task.assignee?.firstName || "Assign to..."}</span>
                        </div>}
                      
                      {openDropdownId === `assignee-${task.id}` && (
                        <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg h-32 overflow-y-auto">
                          <ul className="py-1">
                            {projectMembers.map((projectMember) => (
                              <li key={projectMember.id}>
                                <button
                                  onClick={() => handleAssigneeChange(task.id, projectMember)}
                                  className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100"
                                >
                                  {projectMember.user.firstName}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      {isOwner ? <button
                        onClick={() => setOpenDropdownId(prevId => 
                          prevId === `status-${task.id}` ? null : `status-${task.id}`
                        )}
                        className="w-48 px-4 py-2 text-sm text-left bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className={`inline-flex items-center text-xs leading-5 font-semibold rounded-full py-0.5 px-3 ${getStatusColor(task.taskStatus)}`}
                          >
                            {task.taskStatus}
                          </span>
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </div>
                      </button> : <div className="">
                          <span 
                            className={`inline-flex items-center text-xs leading-5 font-semibold rounded-full py-0.5 px-3 ${getStatusColor(task.taskStatus)}`}
                          >
                            {task.taskStatus}
                          </span>
                        </div>}
                      
                      {openDropdownId === `status-${task.id}` && (
                        <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg h-32">
                          <ul className="py-1">
                            {statusOptions.map((status) => (
                              <li key={status}>
                                <button
                                  onClick={() => handleStatusChange(task.id, status)}
                                  className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                                    status === task.taskStatus ? 'bg-gray-100' : ''
                                  }`}
                                >
                                  <span 
                                    className={`inline-flex items-center text-xs leading-5 font-semibold rounded-full`}
                                  >
                                    {status}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  {isOwner && <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => confirmDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </td> }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Render confirmation modal if a task is set to be deleted */}
        {taskToDelete && (
          <DeleteConfirmationModal
            task={taskToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    );
};

export default TasksListView;