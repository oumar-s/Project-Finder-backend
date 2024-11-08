import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import { useGetTeamQuery, useGetTeamMembersQuery, useRemoveMemberFromTeamMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamMembersPage() {

    let params = useParams();
    const auth = useAuth();

    const { data: members, error: membersError, isLoading: membersLoading } = useGetTeamMembersQuery(params.teamId);
    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);

    const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();

    if (membersLoading || teamLoading) {
        return <div>Loading...</div>
    }
    if (membersError || teamError) {
        return <div>Error: {membersError.message}</div>
    }

    const tabs = [
        { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" }, 
        { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" }, 
        { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" }, 
        { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
    ];

    const handleDelete = (memberId) => {
        // Handle member deletion
        removeMemberFromTeam(memberId);
        console.log(`Deleting member ${memberId}`);
    };

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />

            <TeamMembersListContainer members={members} onDeleteMember={handleDelete} type="team" isOwner={auth.user?.id === team?.ownerID ? true : false } />

            <Footer />
        </div>
    );
}