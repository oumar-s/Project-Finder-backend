import { DashboardContainer } from '../components/Dashboard/dashboardContainer'; 
import { useGetIncompleteTasksForUserQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';

export default function Dashboard() {
    const auth = useAuth();
    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/home"}];

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetIncompleteTasksForUserQuery(auth.user?.id);

    if (tasksLoading) {
        return <div>Loading...</div>
    }
    if (tasksError) {
        return <div>There was an error.</div>
    }
    return (
        <div className=''>
            <Navbar page={'Dashboard'} />


            <TabNav tabs={tabs} />
            <div className='min-h-screen'>
            <DashboardContainer tasks={tasks} />
            </div>
            
            <Footer />
        </div>
    );
}