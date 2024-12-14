import MyTasksListView from './myTasksListView';
import MyTaskModal from './myTaskModal';
import { React, useState } from 'react';
import { useAuth } from '../../context/authContext';


export const MyTasksListContainer = ({tasks, members, assignTask, changeTaskStatus}) => {
  const auth = useAuth();

  const [selectedTask, setSelectedTask] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  

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
      'Done': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Todo': 'bg-yellow-100 text-yellow-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleAssigneeChange = async (taskId, newAssignee) => {
    
    setOpenDropdownId(null);
    console.log('newAssignee: ', newAssignee);
    console.log('taskId: ', taskId);
    try {
      await assignTask({ taskId, userId: newAssignee.user.id });
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setOpenDropdownId(null);
    console.log('newStatus: ', newStatus);
    try {
      await changeTaskStatus({ taskId, body: {status: newStatus} });
    } catch (error) {
      console.error('Error changing task status:', error);
    }
  };

  console.log('My tasks: ', tasks);
  const sortedTasks = [...tasks].sort((a, b) => a.taskName.localeCompare(b.taskName));
  return (
    <>
    <MyTasksListView
      tasks={sortedTasks}
      projectMembers={members}
      openDropdownId={openDropdownId}
      setOpenDropdownId={setOpenDropdownId}
      assignTask={assignTask}
      changeTaskStatus={changeTaskStatus}
      getStatusColor={getStatusColor}
      handleTaskClick={setSelectedTask}
      handleAssigneeChange={handleAssigneeChange}
      handleStatusChange={handleStatusChange}
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