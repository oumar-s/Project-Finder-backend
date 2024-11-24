import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import { useGetAllProjectsQuery } from "../features/api/apiSlice";
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function ExplorePage() {
    const tabs = [
        { id: 1, name: 'Home', link: "/home" }, { id: 2, name: "Teams", link: "/teams" }
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

                <ProjectsContainer projects={data} type="join" />

                <Footer />
            </div>
        );
    }
}