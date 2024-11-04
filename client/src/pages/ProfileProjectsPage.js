import { AllProjectsListContainer } from '../components/AllProjectsList/allProjectsListContainer';
import TabNav from '../components/TabNav';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


export default function ProfileProjectsPage() {
    //tabs:overview, teams, projects, tasks
    const tabs = [{id: 1, name: 'Overview', link: "/profile"}, {id: 2, name: "Teams", link: "/profile/teams"}, {id: 3, name: "Projects", link: "/profile/projects"}, {id: 4, name: "Tasks", link: "/profile/tasks"}];
    return (
        <div >
            <Navbar page="Profile" />

            <TabNav tabs={tabs}/>

            <AllProjectsListContainer />

            <Footer />
        </div>
    );
}