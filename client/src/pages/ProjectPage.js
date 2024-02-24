import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ProjectPageContainer } from '../features/project/projectPage/ProjectPageContainer';

export default function ProjectPage() {

    return (
        <div >
            <Navbar />

            <ProjectPageContainer />

            <Footer />
        </div>
    );
}