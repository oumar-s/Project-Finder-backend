import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamPageContainer } from '../features/team/teamPage/TeamPageContainer';
import { useParams } from "react-router-dom";

export default function TeamPage() {

    let params = useParams();

    const tabs = [
        {id: 1, name: 'Overview', link: "/team-overview"}, {id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects"}, {id: 3, name: "Members", link: "/team-members"}, {id: 2, name: "New project", link: "/teams/" + params.teamId + "/new-project"},
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