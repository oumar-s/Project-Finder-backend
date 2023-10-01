import { ProjectsContainer } from '../features/project/allProjects/allProjectsContainer'
import Navbar from '../common/navbar';
import Footer from '../common/footer';

export default function HomePage() {

    return (
        <div >
            <Navbar />

            <ProjectsContainer />

            <Footer />
        </div>
    );
}