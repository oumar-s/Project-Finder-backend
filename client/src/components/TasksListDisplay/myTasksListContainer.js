import MyTasksListView from './myTasksListView';
import MyTaskModal from './myTaskModal';
import { useGetIncompleteTasksForUserQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/authContext';


export const MyTasksListContainer = ({tasks}) => {
  const params = useParams();
  const auth = useAuth();

  const [selectedTask, setSelectedTask] = useState(null);
  //const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetIncompleteTasksForUserQuery(auth.user?.id);

  const task = [
    {
      id: 1,
      name: 'Implement Dark Mode',
      description: 'Add dark mode support to all components',
      assignedTo: 'Sarah Chen',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'Fix Navigation Bug',
      description: 'Address the navigation issue in mobile view',
      assignedTo: 'John Doe',
      status: 'New'
    },
    {
      id: 3,
      name: 'Update Documentation',
      description: 'Update component documentation with new features',
      assignedTo: 'Sarah Chen',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      'Done': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Todo': 'bg-yellow-100 text-yellow-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

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