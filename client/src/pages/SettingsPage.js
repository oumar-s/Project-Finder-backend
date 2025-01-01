import React, { useState } from 'react';
import { AllProjectsListContainer} from '../components/AllProjectsList/allProjectsListContainer';
import { AllTeamsListContainer } from '../components/AllTeamsList/allTeamsListContainer';
import { SettingsContainer } from '../components/Settings/settingsContainer';
import { useGetUserQuery, useRemoveMemberFromTeamMutation, useRemoveUserFromProjectMutation, useGetAllProjectsForUserQuery, useGetUserTeamsQuery, useUpdateUserProfileMutation, useUpdateEmailMutation, useUpdatePasswordMutation } from '../features/api/apiSlice';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/authContext';

export default function SettingsPage() {
    const auth = useAuth();
    //const user = auth?.user;
    const { data: user, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: projects, projectsError, projectsIsLoading } = useGetAllProjectsForUserQuery(user?.id);
    const { data: teams, teamsError, teamsIsLoading } = useGetUserTeamsQuery(user?.id);
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();
    const [removeUserFromProject] = useRemoveUserFromProjectMutation();
    const [updateEmail] = useUpdateEmailMutation();
    const [updatePassword] = useUpdatePasswordMutation();

    const leaveProject = async (projectId) => {
        await removeUserFromProject(projectId);
        console.log("leave project clicked");
    }

    const leaveTeam = async (teamId) => {
        await removeMemberFromTeam(teamId);
        console.log("leave team clicked");
    }

    const handleEmailUpdate = async (newEmail) => {
        try {
            await updateEmail({ userId: user.id, newEmail });
            // handle success
        } catch (error) {
            // handle error
        }
    };

    const handlePasswordUpdate = async (newPassword) => {
        try {
            await updatePassword({ userId: user.id, newPassword });
            // handle success
        } catch (error) {
            // handle error
        }
    };

    if (projectsIsLoading || teamsIsLoading || userIsLoading) {
        return <div>Loading...</div>
    }   
    if (projectsError || teamsError || userError) {
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
            <Navbar page="Settings" />

            <div className="min-h-screen">
            <SettingsContainer user={user} updateUserProfile={updateUserProfile} updateEmail={updateEmail}  updatePassword={updatePassword} projectMembers={projects} teamMembers={teams} removeUserFromProject={removeUserFromProject} removeMemberFromTeam={removeMemberFromTeam} />
            </div>

            <Footer />
        </div>
    );
}