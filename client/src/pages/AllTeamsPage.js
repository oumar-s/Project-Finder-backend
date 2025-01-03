import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { AllTeamsContainer } from '../features/team/allTeams/AllTeamsContainer';
import { useGetAllTeamsQuery } from "../features/api/apiSlice";
import ErrorMessage from '../components/ErrorMessage';

export default function AllTeamsPage() {
    const { data,  error, isLoading } = useGetAllTeamsQuery();

    const tabs = [
        { id: 1, name: "Teams", link: "/teams" },
        { id: 2, name: 'Projects', link: "/projects" }, 
    ];

    if (isLoading || error) {
        return (
            <div>
                <Navbar page="Explore" />
                <ErrorMessage loading={isLoading} error={error} />
                <Footer />
            </div>
        );
    }

    return (
        <div >
            <Navbar page='Explore' />
            <TabNav page='explore' tabs={tabs}/>
            <div className='min-h-screen'>
                <AllTeamsContainer teams={data} type="Join" />
            </div>

            <Footer />
        </div>
    );
}