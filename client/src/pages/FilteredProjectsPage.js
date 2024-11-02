import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { MyTasksListContainer } from '../components/MyTasksList/myTasksListContainer';
import TabNav from '../components/TabNav';
import { useParams } from "react-router-dom";


export default function FilteredProjectsPage() { 

    const params = useParams();

    const tabs = [{id: 1, name: 'All Tasks', link: "/projects/" + params.projectId + "/all"}, {id: 2, name: "My Tasks", link: "/projects/" + params.projectId + "/my"}, {id: 4, name: "New Task", link: "/projects/" + params.projectId + "/new-task"}, {id: 5, name: "Project Info", link: "/projects/" + params.projectId + "/info"}];

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>

            <MyTasksListContainer />

            <Footer />
        </div>
    );
}