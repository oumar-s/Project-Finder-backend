import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { AllTeamsContainer } from '../features/team/allTeams/AllTeamsContainer';

export default function AllTeamsPage() {

    return (
        <div >
            <Navbar page='Explore' />
            <TabNav />

            <AllTeamsContainer />

            <Footer />
        </div>
    );
}