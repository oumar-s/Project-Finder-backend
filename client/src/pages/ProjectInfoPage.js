import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ProjectPageContainer } from '../features/project/projectPage/ProjectPageContainer';
import { ProjectInfoViewContainer } from '../components/ProjectInfoView/ProjectInfoViewContainer';
//import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import TabNav from '../components/TabNav';
import {useGetProjectQuery, useGetProjectMembersQuery, useRemoveUserFromProjectMutation, useGetProjectTasksQuery } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";


export default function ProjectInfoPage() { 

    const params = useParams();
    const auth = useAuth();

    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useGetProjectTasksQuery(params.projectId);

    const [removeUserFromProject] = useRemoveUserFromProjectMutation();

    if (membersLoading || tasksLoading || projectLoading) {
        return <div>Loading...</div>
    }
    if (membersError || tasksError || projectError) {
        return <div>There was an error.</div>
    }

    const isOwner = project?.ownerID === auth.user?.id;
    const isMember = members?.some(member => member.user.id === auth.user?.id);

    let tabs = [];

    if (isOwner) {
        tabs = [
            { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
            { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
            { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
            { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
            { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
            { id: 6, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        ];
    } else if (isMember) {
        tabs = [
            { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
            { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
            { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
            { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
            { id: 5, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
        ];

    }
    
    else {
        tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];
    }

    const handleDelete = (memberId) => {
        // Handle member deletion
        removeUserFromProject(memberId);
        console.log(`Deleting member ${memberId}`);
    };
     
    return (
        <div >
            <Navbar page="Project" />

            <TabNav tabs={tabs}/>

            <div className='min-h-screen bg-gray-50'>
            { (isMember || isOwner) ?
                <ProjectPageContainer tasks={tasks} members={members}/>
                :
                <ProjectInfoViewContainer project={project} tasks={tasks} members={members} />
            }
            {/* <TeamMembersListContainer members={members} onDeleteMember={handleDelete} type="project" isOwner={project?.ownerID === auth.user?.id ? true : false} /> */}
            </div>

            <Footer />
        </div>
    );
}