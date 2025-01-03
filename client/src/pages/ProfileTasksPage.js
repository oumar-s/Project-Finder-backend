import { MyTasksListContainer } from '../components/TasksListDisplay/myTasksListContainer';
import { useGetTasksForUserQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import TabNav from '../components/TabNav';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { CheckSquare } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage';


export default function ProfileTasksPage() {
    const auth = useAuth();
    const tabs = [
        {id: 1, name: 'Overview', link: "/profile"}, 
        {id: 2, name: "Teams", link: "/profile/teams"}, 
        {id: 3, name: "Projects", link: "/profile/projects"}, 
        {id: 4, name: "Tasks", link: "/profile/tasks"},
        {id: 5, name: "Edit Profile", link: "/account"}
    ];

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetTasksForUserQuery(auth.user?.id);

    if (tasksLoading || tasksError) {
        return (
            <div>
                <Navbar page="Profile" />
                <ErrorMessage loading={tasksLoading} error={tasksError} />
                <Footer />
            </div>
        );
    }

    return (
        <div >
            <Navbar page="Profile" />

            <TabNav tabs={tabs}/>
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-blue-500" />
          My tasks history
        </h2>
            <MyTasksListContainer tasks={tasks} />
            </div>

            <Footer />
        </div>
    );
}