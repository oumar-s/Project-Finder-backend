import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { RequestsListContainer } from '../components/RequestsList/requestsListContainer'; 
import { useGetTeamQuery, useGetTeamMembersQuery, useGetTeamRequestsQuery, useChangeTeamRequestStatusMutation, useAddMemberToTeamMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamRequestsPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: requests, error: requestsError, isLoading: requestsLoading } = useGetTeamRequestsQuery(params.teamId);
    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);
    const { data: teamMembers, error: teamMembersError, isLoading: teamMembersLoading } = useGetTeamMembersQuery(params.teamId);

    const [changeTeamRequestStatus] = useChangeTeamRequestStatusMutation();

    const [addMemberToTeam] = useAddMemberToTeamMutation();

    if (requestsLoading || teamLoading) {
        return <div>Loading...</div>
    }
    if (requestsError || teamError) {
        return <div>There was an error. Please try again.</div>
    }

    const isOwner = team?.ownerID === auth.user?.id;
    const isMember = teamMembers?.some(member => member.user.id === auth.user?.id);
    console.log('team members', teamMembers);
    console.log('isOwner', isOwner);
    console.log('isMember', isMember);

    let tabs = [];

    if (isOwner) {
        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
            { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ]
    } else if(isMember) {
        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" },
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ]
    } else {

        tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
    }
    
    const acceptRequest = async (request) => {
        await changeTeamRequestStatus({ requestId: request.id, status: 'Accepted' });
        await addMemberToTeam({ teamId: request.teamID, userId: request.userID });
        console.log('accept team request', request);

    }

    const declineRequest = async (request) => {
        await changeTeamRequestStatus({ requestId: request.id, status: 'Declined' });
        console.log('decline team request', request);
    }

    return (
        <div >
            <Navbar page="Team" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Team requests</h2>
                </div>
            <RequestsListContainer requests={requests} teamOwnerID={team.ownerID} requestType="team" acceptRequest={acceptRequest} declineRequest={declineRequest}/>
                </div>
            <Footer />
        </div>
    );
}