import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function HomePage() {

    return (
        <div >
            <Navbar page='Explore' />
            <TabNav />

            <ProjectsContainer />

            <Footer />
        </div>
    );
}