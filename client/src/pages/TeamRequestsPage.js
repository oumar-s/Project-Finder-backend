import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { RequestsListContainer } from '../components/RequestsList/requestsListContainer'; 
import { useGetTeamRequestsQuery, useChangeTeamRequestStatusMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamRequestsPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: requests, error: requestsError, isLoading: requestsLoading } = useGetTeamRequestsQuery(params.teamId);

    const [changeTeamRequestStatus] = useChangeTeamRequestStatusMutation();

    if (requestsLoading) {
        return <div>Loading...</div>
    }
    if (requestsError) {
        return <div>There was an error. Please try again.</div>
    }

    const tabs = [
        { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" }, 
        { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" }, 
        { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
        { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
        { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
    ]

    const acceptRequest = async (request) => {
        await changeTeamRequestStatus({ requestId: request.id, status: 'Accepted' });
        console.log('accept team request', request);
    }

    const declineRequest = async (request) => {
        await changeTeamRequestStatus({ requestId: request.id, status: 'Declined' });
        console.log('decline team request', request);
    }

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />

            <RequestsListContainer requests={requests} requestType="team" acceptRequest={acceptRequest} declineRequest={declineRequest}/>

            <Footer />
        </div>
    );
}