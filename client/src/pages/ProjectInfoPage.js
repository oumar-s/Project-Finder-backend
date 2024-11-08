import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ProjectPageContainer } from '../features/project/projectPage/ProjectPageContainer';
import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import TabNav from '../components/TabNav';
import {useGetProjectQuery, useGetProjectMembersQuery, useRemoveUserFromProjectMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";


export default function ProjectInfoPage() { 

    const params = useParams();
    const auth = useAuth();

    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

    const [removeUserFromProject] = useRemoveUserFromProjectMutation();

    if (membersLoading || projectLoading) {
        return <div>Loading...</div>
    }
    if (membersError || projectError) {
        return <div>Error: {membersError.message}</div>
    }

    const tabs = [{id: 1, name: 'All Tasks', link: "/projects/" + params.projectId + "/all"}, 
        {id: 2, name: "My Tasks", link: "/projects/" + params.projectId + "/my"}, 
        {id: 4, name: "New Task", link: "/projects/" + params.projectId + "/new-task"}, 
        {id: 5, name: "Project Info", link: "/projects/" + params.projectId + "/info"}
    ];

    const handleDelete = (memberId) => {
        // Handle member deletion
        removeUserFromProject(memberId);
        console.log(`Deleting member ${memberId}`);
    };

    return (
        <div >
            <Navbar />

            <TabNav tabs={tabs}/>

            <ProjectPageContainer />

            <TeamMembersListContainer members={members} onDeleteMember={handleDelete} type="project" isOwner={project?.ownerID === auth.user?.id ? true : false} />

            <Footer />
        </div>
    );
}