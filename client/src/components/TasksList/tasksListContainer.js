import TasksListView from './tasksListView';
import TaskModal from './taskModal';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';


export const TasksListContainer = ({tasks, members, assignTask, deleteTask, changeTaskStatus, isOwner}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  
  /// State to manage the task being considered for deletion
  const [taskToDelete, setTaskToDelete] = useState(null);

  
  // Modified delete handler to show confirmation first
  const confirmDeleteTask = (taskId) => {
      const taskToDelete = tasks.find(task => task.id === taskId);
      setTaskToDelete(taskToDelete);
  };

  const handleConfirmDelete = () => {
      if (taskToDelete) {
          handleDeleteTask(taskToDelete.id);
          setTaskToDelete(null);
      }
  };

  const handleCancelDelete = () => {
      setTaskToDelete(null);
  };


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

  const handleDeleteTask = async (taskId) => {
    setOpenDropdownId(null);
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  console.log('tasks: ', tasks);
  const sortedTasks = [...tasks].sort((a, b) => a.taskName.localeCompare(b.taskName));
  return (
    <>
    <TasksListView
      tasks={sortedTasks}
      projectMembers={members}
      openDropdownId={openDropdownId} 
      setOpenDropdownId={setOpenDropdownId}
      handleAssigneeChange={handleAssigneeChange}
      handleStatusChange={handleStatusChange}
      getStatusColor={getStatusColor}
      handleTaskClick={setSelectedTask}
      handleDeleteTask={handleDeleteTask}
      confirmDeleteTask={confirmDeleteTask}
      handleConfirmDelete={handleConfirmDelete}
      handleCancelDelete={handleCancelDelete}
      taskToDelete={taskToDelete}
      isOwner={isOwner}
    />

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          getStatusColor={getStatusColor}
        />
      )}

    </>
  )

}