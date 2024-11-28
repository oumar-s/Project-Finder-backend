import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
//import { ProjectsListContainer } from '../components/ProjectsList/projectsListContainer'; 
import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import { useGetProjectsForTeamQuery } from '../features/api/apiSlice';
import { useParams } from "react-router-dom";

export default function TeamProjectsPage() {
    const params = useParams();
    const { data: projects, error: projectsError, isLoading: projectsLoading } = useGetProjectsForTeamQuery(params.teamId);

    const tabs = [
        { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" }, { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" }, { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" }, { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
    ];

    if (projectsLoading) {
        return <div>Loading...</div>
    }
    if (projectsError) {
        return <div>There was an error. Please try again.</div>
    }

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />
            <div className='h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Team projects</h2>
                </div>
                <ProjectsContainer projects={projects} type="join" />
            </div>

            <Footer />
        </div>
    );
}