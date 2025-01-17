import { ProjectsListContainer } from '../components/ProjectsList/projectsListContainer';
import TabNav from '../components/TabNav';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useGetAllProjectsForUserQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import ErrorMessage from '../components/ErrorMessage';

export default function ProfileProjectsPage() {
    const tabs = [
        {id: 1, name: 'Overview', link: "/profile"}, 
        {id: 2, name: "Teams", link: "/profile/teams"}, 
        {id: 3, name: "Projects", link: "/profile/projects"}, 
        {id: 4, name: "Tasks", link: "/profile/tasks"},
        {id: 5, name: "Edit Profile", link: "/account"}
    ];
    const auth = useAuth();
    const { data: projects, isSuccess, error, isLoading } = useGetAllProjectsForUserQuery(auth.user?.id);

    if (isLoading || error) {
        return (
            <div>
                <Navbar page="Profile" />
                <ErrorMessage loading={isLoading} error={error} />
                <Footer />
            </div>
        );
    }

    return (
        <div >
            <Navbar page="Profile" />

            <TabNav tabs={tabs}/>

            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">All your projects</h2>
                </div>
            {isSuccess && <ProjectsListContainer projects={projects} />}

            </div>

            <Footer />
        </div>
    );
}