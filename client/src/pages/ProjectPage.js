import Navbar from '../common/navbar';
import Footer from '../common/footer';
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