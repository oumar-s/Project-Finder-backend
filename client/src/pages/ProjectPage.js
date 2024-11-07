import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { TasksListContainer } from '../components/TasksList/tasksListContainer';
import { useGetProjectQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";



export default function ProjectPage() {

    const params = useParams();
    const auth = useAuth();
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

    if (projectLoading) {
        return <div>Loading...</div>
    }
    if (projectError) {
        return <div>There was an error.</div>
    }

    let tabs = [];
    if (project?.ownerID === auth.user?.id) {
        tabs = [
            { id: 1, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
            { id: 2, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
            { id: 3, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
            { id: 4, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
            { id: 5, name: "Project Info", link: "/projects/" + params.projectId + "/info" }
        ];
    }
    else {
        tabs = [
        { id: 1, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 2, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 3, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        { id: 4, name: "Project Info", link: "/projects/" + params.projectId + "/info" }
        ];
    }

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs} />

            <TasksListContainer />

            <Footer />
        </div>
    );
}