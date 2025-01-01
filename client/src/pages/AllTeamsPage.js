import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { AllTeamsContainer } from '../features/team/allTeams/allTeamsContainer';
import { useGetAllTeamsQuery } from "../features/api/apiSlice";

export default function AllTeamsPage() {
    const { data,  error, isLoading } = useGetAllTeamsQuery();

    const tabs = [
        { id: 1, name: "Teams", link: "/teams" },
        { id: 2, name: 'Projects', link: "/projects" }, 
    ];

    if (isLoading) {
        return <div className="" style={{ minHeight: "calc(100vh - 268px)" }}>Loading teams...</div>;
    }

    if (error) {
        return <div>There was an error.</div>;
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