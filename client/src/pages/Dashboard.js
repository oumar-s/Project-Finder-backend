import { DashboardContainer } from '../components/Dashboard/dashboardContainer'; 
import { useGetIncompleteTasksForUserQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {
    const auth = useAuth();
    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetIncompleteTasksForUserQuery(auth.user?.id);

    if (tasksLoading || tasksError) {
        return (
            <div>
                <Navbar page="Dashboard" />
                <ErrorMessage loading={tasksLoading} error={tasksError} />
                <Footer />
            </div>
        );
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