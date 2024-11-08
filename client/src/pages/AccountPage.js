import { AllProjectsListContainer} from '../components/AllProjectsList/allProjectsListContainer';
import { AllTeamsListContainer } from '../components/AllTeamsList/allTeamsListContainer';
import { useRemoveMemberFromTeamMutation, useRemoveUserFromProjectMutation } from '../features/api/apiSlice';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function AccountPage() {

    const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();
    const [removeUserFromProject] = useRemoveUserFromProjectMutation();

    const leaveProject = async (projectId) => {
        await removeUserFromProject(projectId);
        console.log("leave project clicked");
    }

    const leaveTeam = async (teamId) => {
        await removeMemberFromTeam(teamId);
        console.log("leave team clicked");
    }

    return (
        <div >
            <Navbar />

            <div className="">
            Teams:
            <AllTeamsListContainer settingsPage={true} leaveTeam={leaveTeam} />
            </div>

            <div className="" >
            Projects:
            <AllProjectsListContainer settingsPage={true} leaveProject={leaveProject} />
            </div>
            
            <Footer />
        </div>
    );
}