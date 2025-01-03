import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
//import { ProjectsListContainer } from '../components/ProjectsList/projectsListContainer'; 
import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import { useGetProjectsForTeamQuery, useGetTeamQuery, useGetTeamMembersQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamProjectsPage() {
    const params = useParams();
    const auth = useAuth();
    const { data: projects, error: projectsError, isLoading: projectsLoading } = useGetProjectsForTeamQuery(params.teamId);
    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);
    const { data: teamMembers, error: teamMembersError, isLoading: teamMembersLoading } = useGetTeamMembersQuery(params.teamId);


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

    if (projectsLoading || teamLoading || teamMembersLoading) {
        return <div>Loading...</div>
    }
    if (projectsError || teamError || teamMembersError) {
        return <div>There was an error. Please try again.</div>
    }

    return (
        <div >
            <Navbar page="Team" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Team projects</h2>
                </div>
                <ProjectsContainer projects={projects} type="join" />
            </div>

            <Footer />
        </div>
    );
}