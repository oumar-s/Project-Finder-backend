import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { RequestsListContainer } from '../components/RequestsList/requestsListContainer'; 
import { useGetProjectQuery, useGetProjectMembersQuery, useGetProjectRequestsQuery, useChangeProjectRequestStatusMutation, useAddUserToProjectMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";
import ErrorMessage from '../components/ErrorMessage';

export default function ProjectRequestsPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: requests, error: requestsError, isLoading: requestsLoading } = useGetProjectRequestsQuery(params.projectId);
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);

    const [changeProjectRequestStatus] = useChangeProjectRequestStatusMutation();

    const [addUserToProject] = useAddUserToProjectMutation();

    const isLoading = requestsLoading || projectLoading || membersLoading;
    const hasError = requestsError || projectError || membersError;

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

    const acceptRequest = async (request) => {
        await addUserToProject({ projectId: request.projectID, userId: request.userID });
        await changeProjectRequestStatus({ requestId: request.id, status: 'Accepted' });
        console.log('accept team request', request);

    }

    const declineRequest = async (request) => {
        await changeProjectRequestStatus({ requestId: request.id, status: 'Declined' });
        console.log('decline team request', request);
    }

    return (
        <div >
            <Navbar page="Project" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Project requests</h2>
                </div>
            <RequestsListContainer requests={requests} requestType="project" acceptRequest={acceptRequest} declineRequest={declineRequest}/>
            </div>


            <Footer />
        </div>
    );
}