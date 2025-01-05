import MyTasksListView from './myTasksListView';
import MyTaskModal from './myTaskModal';
import { React, useState } from 'react';


export const MyTasksListContainer = ({tasks}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  
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