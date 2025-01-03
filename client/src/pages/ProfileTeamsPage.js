import { TeamsListContainer } from '../components/TeamsList/teamsContainer';
import { useGetUserTeamsQuery } from '../features/api/apiSlice';
import TabNav from '../components/TabNav';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/authContext';
import ErrorMessage from '../components/ErrorMessage';


export default function ProfileTeamsPage() {
    const auth = useAuth();
    const { data,  error, isLoading } = useGetUserTeamsQuery(auth.user?.id);
    const tabs = [
        {id: 1, name: 'Overview', link: "/profile"}, 
        {id: 2, name: "Teams", link: "/profile/teams"}, 
        {id: 3, name: "Projects", link: "/profile/projects"}, 
        {id: 4, name: "Tasks", link: "/profile/tasks"},
        {id: 5, name: "Edit Profile", link: "/account"}
    ];

    if (isLoading || error) {
        return (
            <div>
                <Navbar page="Profile" />
                <ErrorMessage loading={isLoading} error={error} />
                <Footer />
            </div>
        );
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