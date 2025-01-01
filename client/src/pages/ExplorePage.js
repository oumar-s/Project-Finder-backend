import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import { useGetAllProjectsQuery } from "../features/api/apiSlice";
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function ExplorePage() {
    const tabs = [
        { id: 1, name: "Teams", link: "/teams" },
        { id: 2, name: 'Projects', link: "/projects" }, 
    ];

    const { data, isSuccess, error, isLoading } = useGetAllProjectsQuery();

    if (isLoading) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading projects...</div>;
    }

    if (error) {
        return <div>Error! Try again: {error.message}</div>;
    }



    if (isSuccess) {


        return (
            <div >
                <Navbar page='Explore' />
                <TabNav page='explore' tabs={tabs} />

                <div className='min-h-screen max-w-4xl mx-auto p-6'>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700">All projects</h2>
                    </div>
                    <ProjectsContainer projects={data} type="join" />

                </div>

                <Footer />
            </div>
        );
    }
}