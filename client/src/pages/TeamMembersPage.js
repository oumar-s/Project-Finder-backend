import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import { useParams } from "react-router-dom";

export default function TeamMembersPage() {

    let params = useParams();

    const tabs = [
        {id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview"}, {id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects"}, {id: 3, name: "Members", link: "/teams/" + params.teamId + "/members"}, {id: 2, name: "New project", link: "/teams/" + params.teamId + "/new-project"},
    ];
    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>

            <TeamMembersListContainer />

            <Footer />
        </div>
    );
}