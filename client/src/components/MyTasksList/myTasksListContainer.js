import MyTasksListView from './myTasksListView';
import MyTaskModal from './myTaskModal';
import { useGetProjectTasksAssignedToUserQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/authContext';


export const MyTasksListContainer = () => {
  const params = useParams();
  const auth = useAuth();

  const [selectedTask, setSelectedTask] = useState(null);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksAssignedToUserQuery({projectId: params.projectId, userId: auth.user?.id});

  const task = [
    {
      id: 1,
      title: "Implement User Authentication",
      description: "Add login and registration functionality using JWT tokens",
      assignee: "Sarah Chen",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Design Database Schema",
      description: "Create ERD and implement database models for the application",
      assignee: "Mike Johnson",
      status: "Completed"
    },
    {
      id: 3,
      title: "API Documentation",
      description: "Document all API endpoints using Swagger",
      assignee: "Alex Thompson",
      status: "Pending"
    },
    {
      id: 4,
      title: "Unit Test Coverage",
      description: "Increase test coverage to 80% for core modules",
      assignee: "Emily Davis",
      status: "In Review"
    }
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Review': 'bg-purple-100 text-purple-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if(tasksError) {
    console.error(tasksError);
    return <div>Error loading tasks</div>;
  }

  if(tasksLoading) {
    return <div>Loading...</div>;
  }

  console.log('tasks: ', tasks);
  return (
    <>
    <MyTasksListView
      tasks={tasks}
      getStatusColor={getStatusColor}
      handleTaskClick={setSelectedTask}
    />

      {selectedTask && (
        <MyTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          getStatusColor={getStatusColor}
        />
      )}

    </>
  )

}