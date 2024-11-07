import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamPageContainer } from '../features/team/teamPage/TeamPageContainer';
import { useGetTeamQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function TeamOverviewPage() {
    const params = useParams();
    const auth = useAuth();

    const { data: team, error: teamError, isLoading: teamLoading } = useGetTeamQuery(params.teamId);

    if (teamLoading) {
        return <div>Loading...</div>
    }
    if (teamError) {
        return <div>There was an error. Please try again.</div>
    }

    let tabs = [];

    if (team?.ownerID === auth.user?.id) {
        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" }, 
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" }, 
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" },
            { id: 5, name: "Requests", link: "/teams/" + params.teamId + "/requests" },
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ]
    } else {

        tabs = [
            { id: 1, name: 'Overview', link: "/teams/" + params.teamId + "/overview" },
            { id: 2, name: "Projects", link: "/teams/" + params.teamId + "/projects" }, 
            { id: 3, name: "Members", link: "/teams/" + params.teamId + "/members" }, 
            { id: 4, name: "New project", link: "/teams/" + params.teamId + "/new-project" },
        ];
    }
    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />

            <TeamPageContainer team={team} />

            <Footer />
        </div>
    );
}