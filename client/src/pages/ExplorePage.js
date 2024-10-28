import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function ExplorePage() {
    const tabs = [
        {id: 1, name: 'Home', link: "/home"}, {id: 2, name: "Teams", link: "/teams"}
    ];

    return (
        <div >
            <Navbar page='Explore' />
            <TabNav page='explore' tabs={tabs}/>

            <ProjectsContainer />

            <Footer />
        </div>
    );
}