import MyTasksListView from './myTasksListView';
import MyTaskModal from './myTaskModal';
import { useGetIncompleteTasksForUserQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/authContext';


export const MyTasksListContainer = () => {
  const params = useParams();
  const auth = useAuth();

  const [selectedTask, setSelectedTask] = useState(null);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetIncompleteTasksForUserQuery(auth.user?.id);

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
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'in progress':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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