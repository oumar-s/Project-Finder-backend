import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { RequestsListContainer } from '../components/RequestsList/requestsListContainer'; 
import { useGetProjectRequestsQuery, useChangeProjectRequestStatusMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function ProjectRequestsPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: requests, error: requestsError, isLoading: requestsLoading } = useGetProjectRequestsQuery(params.projectId);

    const [changeProjectRequestStatus] = useChangeProjectRequestStatusMutation();

    if (requestsLoading) {
        return <div>Loading...</div>
    }
    if (requestsError) {
        return <div>There was an error. Please try again.</div>
    }

    const tabs = [
        { id: 1, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 2, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 3, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        { id: 4, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
        { id: 5, name: "Project Info", link: "/projects/" + params.projectId + "/info" }
    ];

    const acceptRequest = async (request) => {
        await changeProjectRequestStatus({ requestId: request.id, status: 'Accepted' });
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