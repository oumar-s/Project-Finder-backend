import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { MyTasksListContainer } from '../components/MyTasksList/myTasksListContainer';
import { useGetProjectTasksAssignedToUserQuery, useGetProjectMembersQuery, useAssignTaskMutation, useChangeTaskStatusMutation } from '../features/api/apiSlice';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";
import { useAuth } from '../context/authContext';


export default function FilteredProjectsPage() { 

    const auth = useAuth();
    const params = useParams();
    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksAssignedToUserQuery({projectId: params.projectId, userId: auth.user?.id});
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    
    
    const [assignTask] = useAssignTaskMutation();
    const [changeTaskStatus] = useChangeTaskStatusMutation();

    const tabs = [
        { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
        { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
        { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
        { id: 6, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
    ];

    if (tasksLoading || membersLoading) {
        return <div>Loading...</div>
    }
    if (tasksError || membersError) {
        return <div>There was an error. Please try again.</div>
    }
    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>
            <div className='min-h-screen'>
            <MyTasksListContainer tasks={tasks} members={members} assignTask={assignTask} changeTaskStatus={changeTaskStatus}/>
            </div>

            <Footer />
        </div>
    );
}