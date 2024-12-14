import React from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { CheckSquare, Eye } from 'lucide-react';

const MyTasksListView = ({ tasks, getStatusColor, handleTaskClick }) => {
  const EmptyState = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`text-center p-6 ${className}`}>
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Tasks Section */}
      <div>
        
        {tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <Link  
                  to={`/projects/${task.project.id}/my`} className="font-medium text-blue-600 hover:text-blue-800 hover:underline">{task.taskName}</Link>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.taskStatus)}`}>
                    {task.taskStatus}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.taskDescription}</p>
                <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Assigned to: <span className="text-gray-900">{task.assignee.firstName}</span>
                </div>
                <button 
                    onClick={() => handleTaskClick(task)}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                {/* <Link
                  to={`/tasks/${task.id}`}
                  onClick={() => handleTaskClick(task)}
                  className="ml-auto text-sm text-teal-600 hover:text-blue-800 hover:underline"
                >
                  View Details
                </Link> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={CheckSquare}
            title="No tasks assigned"
            description="You're all caught up! No tasks are currently assigned to you."
            className="bg-white rounded-lg border border-gray-200 shadow-sm m-8 p-8"
          />
        )}
      </div>
    </div>
  );
};

export default MyTasksListView;