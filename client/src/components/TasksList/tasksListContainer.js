import TasksListView from './tasksListView';
import TaskModal from './taskModal';
import { useGetProjectTasksQuery, useGetProjectMembersQuery } from '../../features/api/apiSlice';
import { React, useState } from 'react';
import { useParams } from "react-router-dom";

export const TasksListContainer = () => {
  const params = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksQuery(params.projectId);

  const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);

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

  const teamMember = [
    { id: 1, name: "Sarah Chen" },
    { id: 2, name: "Mike Johnson" },
    { id: 3, name: "Alex Thompson" },
    { id: 4, name: "Emily Davis" }
  ];

  const handleAssigneeChange = async (taskId, newAssignee) => {
    try {
      // Here you would typically make an API call to update the assignee
      tasks.find(task => task.id === taskId).assignee = newAssignee;
      console.log(`Assigning task ${taskId} to user ${newAssignee.id}`);
    } catch (error) {
      console.error('Error updating assignee:', error);
    }
  };

  console.log('tasks: ', tasks);
  return (
    <>
    <TasksListView
      tasks={tasks}
      projectMembers={members}
      openDropdownId={openDropdownId} 
      setOpenDropdownId={setOpenDropdownId}
      handleAssigneeChange={handleAssigneeChange}
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
  )

}