import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddTaskFormContainer } from '../components/AddTaskForm/addTaskFormContainer';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";
import { useGetProjectQuery, useGetProjectMembersQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import ErrorMessage from '../components/ErrorMessage';

export default function CreateTaskPage() { 
    const params = useParams();
    const auth = useAuth();
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);

    const isLoading = projectLoading || membersLoading;
    const hasError = projectError || membersError;

    if (isLoading || hasError) {
        return (
            <div>
                <Navbar page="Project" />
                <ErrorMessage loading={isLoading} error={hasError} />
                <Footer />
            </div>
        );
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
            <Navbar page="Project"/>

            <TabNav tabs={tabs}/>
            <div className='min-h-screen p-8'>
            <AddTaskFormContainer />
            </div>
            <Footer />
        </div>
    );
}