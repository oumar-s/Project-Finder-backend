import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AddTaskFormContainer } from '../components/AddTaskForm/addTaskFormContainer';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";


export default function CreateTaskPage() { 

    const params = useParams();

    const tabs = [
        { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
        { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
        { id: 4, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
    ];

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>
            <div className='min-h-screen p-8'>
            <AddTaskFormContainer />
            </div>

            <Footer />
        </div>
    );
}