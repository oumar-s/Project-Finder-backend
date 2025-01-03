import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { TasksListContainer } from '../components/TasksList/tasksListContainer';
import { useGetProjectQuery } from '../features/api/apiSlice';
import { useGetProjectTasksQuery, useGetProjectMembersQuery, useAssignTaskMutation, useChangeTaskStatusMutation, useDeleteTaskMutation } from '../features/api/apiSlice';
import { React, useState } from 'react';
import { useAuth } from '../context/authContext';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";



export default function ProjectAllTasksPage() {

    const params = useParams();
    const auth = useAuth();
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksQuery(params.projectId);
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);


    const [assignTask] = useAssignTaskMutation();
    const [changeTaskStatus] = useChangeTaskStatusMutation();
    const [deleteTask] = useDeleteTaskMutation();

    if (tasksLoading || membersLoading || projectLoading) {
        return <div>Loading...</div>
    }
    if (tasksError || membersError || projectError) {
        return <div>There was an error</div>
    }

    const isOwner = project?.ownerID === auth.user?.id;
    const isMember = members?.some(member => member.user.id === auth.user?.id);

    let tabs = [];

    if (isOwner) {
        tabs = [
            { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
            { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
            { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
            { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
            { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
            { id: 6, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        ];
    } else if (isMember) {
        tabs = [
            { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
            { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
            { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
            { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
            { id: 5, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        ];
    } else {
        tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
    }

    return (
        <div >
            <Navbar page="Project" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen'>
            <TasksListContainer tasks={tasks} members={members} assignTask={assignTask} changeTaskStatus={changeTaskStatus} deleteTask={deleteTask} isOwner={isOwner} />
            </div>

            <Footer />
        </div>
    );
}