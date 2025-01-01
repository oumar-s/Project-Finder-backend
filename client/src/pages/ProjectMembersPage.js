import Navbar from '../components/navbar';
import TabNav from '../components/TabNav';
import Footer from '../components/footer';
import { TeamMembersListContainer } from '../components/TeamMembersList/teamMembersListContainer';
import { useGetProjectQuery, useGetProjectMembersQuery, useRemoveUserFromProjectMutation } from '../features/api/apiSlice';
import { useAuth } from '../context/authContext';
import { useParams } from "react-router-dom";

export default function ProjectMembersPage() {

    let params = useParams();
    const auth = useAuth();

    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    const { data: project, error: projectError, isLoading: projectLoading } = useGetProjectQuery(params.projectId);

    const [removeMemberFromProject] = useRemoveUserFromProjectMutation();

    if (membersLoading || projectLoading) {
        return <div>Loading...</div>
    }
    if (membersError || projectError) {
        return <div>There was an error.</div>
    }

    const tabs = [
        { id: 1, name: "Overview", link: "/projects/" + params.projectId + "/info" },
        { id: 2, name: 'All Tasks', link: "/projects/" + params.projectId + "/all" },
        { id: 3, name: "My Tasks", link: "/projects/" + params.projectId + "/my" },
        { id: 4, name: "Members", link: "/projects/" + params.projectId + "/members" },
        { id: 5, name: "Requests", link: "/projects/" + params.projectId + "/requests" },
        { id: 6, name: "New Task", link: "/projects/" + params.projectId + "/new-task" },
    ];

    const handleDelete = (memberId) => {
        // Handle member deletion
        removeMemberFromProject(memberId);
        console.log(`Deleting member ${memberId}`);
    };

    return (
        <div className='' >
            <Navbar page="Project" />

            <TabNav tabs={tabs} />
            <div className='min-h-screen max-w-4xl mx-auto p-6'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Team members</h2>
                </div>
                <TeamMembersListContainer members={members} onDeleteMember={handleDelete} type="team" isOwner={auth.user?.id === project?.ownerID ? true : false} />
            </div>

            <Footer />
        </div>
    );
}