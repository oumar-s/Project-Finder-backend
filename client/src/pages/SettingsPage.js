import { AllProjectsListContainer} from '../components/AllProjectsList/allProjectsListContainer';
import { AllTeamsListContainer } from '../components/AllTeamsList/allTeamsListContainer';
import { SettingsContainer } from '../components/Settings/settingsContainer';
import { useRemoveMemberFromTeamMutation, useRemoveUserFromProjectMutation, useGetAllProjectsForUserQuery, useGetUserTeamsQuery, useUpdateUserProfileMutation } from '../features/api/apiSlice';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/authContext';

export default function SettingsPage() {
    const auth = useAuth();
    const user = auth?.user;
    const { data: projects, projectsError, projectsIsLoading } = useGetAllProjectsForUserQuery(user?.id);
    const { data: teams, teamsError, teamsIsLoading } = useGetUserTeamsQuery(user?.id);
    const [updateUserProfile] = useUpdateUserProfileMutation();
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

    if (projectsIsLoading || teamsIsLoading) {
        return <div>Loading...</div>
    }   
    if (projectsError || teamsError) {
        return <div>There was an error.</div>
    }

    // return (
    //     <div >
    //         <Navbar />

    //         <div className="">
    //         Teams:
    //         <AllTeamsListContainer settingsPage={true} leaveTeam={leaveTeam} />
    //         </div>

    //         <div className="" >
    //         Projects:
    //         <AllProjectsListContainer settingsPage={true} leaveProject={leaveProject} />
    //         </div>
            
    //         <Footer />
    //     </div>
    // );
    return (
        <div >
            <Navbar page="Account" />

            <div className="min-h-screen">
            <SettingsContainer user={user} updateUserProfile={updateUserProfile} projectMembers={projects} teamMembers={teams}/>
            </div>

            <Footer />
        </div>
    );
}