import { TeamsListContainer } from '../components/TeamsList/teamsContainer';
import { useGetUserTeamsQuery } from '../features/api/apiSlice';
import TabNav from '../components/TabNav';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/authContext';


export default function ProfileTeamsPage() {
    const auth = useAuth();
    const { data,  error, isLoading } = useGetUserTeamsQuery(auth.user?.id);
    //tabs:overview, teams, projects, tasks
    const tabs = [{id: 1, name: 'Overview', link: "/profile"}, {id: 2, name: "Teams", link: "/profile/teams"}, {id: 3, name: "Projects", link: "/profile/projects"}, {id: 4, name: "Tasks", link: "/profile/tasks"}];

    if (isLoading) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading teams...</div>;
    }
    if (error) {
        return <div>There was an error.</div>;
    }
    return (
        <div >
            <Navbar page="Profile" />

            <TabNav tabs={tabs}/>
            <div className="min-h-screen">
            <TeamsListContainer teams={data} isTeamMemberList={true}/>
            </div>
            <Footer />
        </div>
    );
}