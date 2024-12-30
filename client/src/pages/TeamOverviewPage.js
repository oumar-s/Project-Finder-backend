import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamPageContainer } from '../features/team/teamPage/TeamPageContainer';
import TeamInfoViewContainer from '../components/TeamInfoView/TeamInfoViewContainer';
import { useGetTeamQuery, useGetProjectsForTeamQuery, useGetTeamMembersQuery, useGetUserProjectsInTeamQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamOverviewPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: teamProjects, error: teamProjectsError, isLoading: teamProjectsLoading } = useGetProjectsForTeamQuery(params.teamId);

    const { data: myProjects, error: myProjectsError, isLoading: myProjectsLoading } = useGetUserProjectsInTeamQuery({ teamId: params.teamId, userId: auth.user?.id });

    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);

    const {data: teamMembers, error: teamMembersError, isLoading: teamMembersLoading} = useGetTeamMembersQuery(params.teamId);

    if (teamLoading || teamProjectsLoading || myProjectsLoading || teamMembersLoading) {
        return <div>Loading...</div>
    }
    if (teamError || teamProjectsError || myProjectsError || teamMembersError) {
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
    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />
            
            {(isMember || isOwner) ?  <TeamPageContainer team={team} teamMembers={teamMembers} teamProjects={teamProjects} myProjects={myProjects} />
            : 
            <TeamInfoViewContainer team={team} teamMembers={teamMembers} teamProjects={teamProjects} />
            }


            <Footer />
        </div>
    );
}