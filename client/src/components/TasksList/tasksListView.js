import React from 'react';
import { ChevronDown } from "lucide-react";

const TasksListView = ({ 
  tasks, 
  projectMembers,
  openDropdownId, 
  setOpenDropdownId, 
  handleAssigneeChange,
  getStatusColor, 
  handleTaskClick }) => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === task.id ? null : task.id)}
                        className="w-48 px-4 py-2 text-sm text-left bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex items-center justify-between">
                          <span>{task.assignee?.firstName || "Assign to..."}</span>
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </div>
                      </button>
                      
                      {openDropdownId === task.id && (
                        <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.taskStatus)}`}>
                      {task.taskStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default TasksListView;