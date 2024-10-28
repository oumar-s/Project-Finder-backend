import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { AllTeamsContainer } from '../features/team/allTeams/allTeamsContainer';

export default function AllTeamsPage() {

    const tabs = [
        {id: 1, name: 'Home', link: "/home"}, {id: 2, name: "Teams", link: "/teams"}
    ];
    return (
        <div >
            <Navbar page='Explore' />
            <TabNav page='explore' tabs={tabs}/>

            <AllTeamsContainer />

            <Footer />
        </div>
    );
}