import { DashboardContainer } from '../components/Dashboard/dashboardContainer'; 
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function Dashboard() {
    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/home"}];

    return (
        <div className=''>
            <Navbar page={'Dashboard'} />


            <TabNav tabs={tabs} />

            <DashboardContainer />
            
            <Footer />
        </div>
    );
}