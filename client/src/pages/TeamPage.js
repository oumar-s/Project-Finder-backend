import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { TeamPageContainer } from '../features/team/teamPage/TeamPageContainer';

export default function TeamPage() {

    return (
        <div >
            <Navbar />

            <TeamPageContainer />

            <Footer />
        </div>
    );
}