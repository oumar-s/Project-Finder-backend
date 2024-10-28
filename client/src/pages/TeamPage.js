import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamPageContainer } from '../features/team/teamPage/TeamPageContainer';

export default function TeamPage() {

    const tabs = [
        {id: 1, name: 'Overview', link: "/team-overview"}, {id: 2, name: "Projects", link: "/team-projects"}, {id: 3, name: "Members", link: "/team-members"}
    ];
    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>

            <TeamPageContainer />

            <Footer />
        </div>
    );
}