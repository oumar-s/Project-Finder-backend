import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { RequestsListContainer } from '../components/RequestsList/requestsListContainer'; 
import { useGetProjectRequestsQuery, useChangeProjectRequestStatusMutation, useAddUserToProjectMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function ProjectRequestsPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: requests, error: requestsError, isLoading: requestsLoading } = useGetProjectRequestsQuery(params.projectId);

    const [changeProjectRequestStatus] = useChangeProjectRequestStatusMutation();

    const [addUserToProject] = useAddUserToProjectMutation();

    if (requestsLoading) {
        return <div>Loading...</div>
    }
    if (requestsError) {
        return <div>There was an error. Please try again.</div>
    }

    const tabs = [
        { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
        { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
        { id: 4, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        
        
    ];

    const acceptRequest = async (request) => {
        await changeProjectRequestStatus({ requestId: request.id, status: 'Accepted' });
        await addUserToProject({ projectId: request.projectID, userId: request.userID });
        console.log('accept team request', request);

    }

    const declineRequest = async (request) => {
        await changeProjectRequestStatus({ requestId: request.id, status: 'Declined' });
        console.log('decline team request', request);
    }

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />

            <RequestsListContainer requests={requests} requestType="project" acceptRequest={acceptRequest} declineRequest={declineRequest}/>

            <Footer />
        </div>
    );
}