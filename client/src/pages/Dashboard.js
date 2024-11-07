import { DashboardContainer } from '../components/Dashboard/dashboardContainer'; 
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Dashboard() {

    return (
        <div >
            <Navbar />

            <DashboardContainer />
            
            <Footer />
        </div>
    );
}