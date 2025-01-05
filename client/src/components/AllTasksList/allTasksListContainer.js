import AllTasksListView from './allTasksListView';
import TaskModal from './taskModal';
import { useGetTasksForUserQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useAuth } from '../../context/authContext';
import ErrorMessage from '../ErrorMessage';

export const AllTasksListContainer = () => {
  const auth = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetTasksForUserQuery(auth.user?.id);

  const getStatusColor = (status) => {
    const statusColors = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Review': 'bg-purple-100 text-purple-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <ErrorMessage loading={tasksLoading} error={tasksError} />
      {!tasksLoading && !tasksError && (
        <>
          <AllTasksListView
            tasks={tasks}
            getStatusColor={getStatusColor}
            handleTaskClick={setSelectedTask}
          />

          {selectedTask && (
            <TaskModal
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              getStatusColor={getStatusColor}
            />
          )}
        </>
      )}
    </>
  );
}