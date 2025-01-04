import React, { useState } from 'react';
import { AllProjectsListContainer} from '../components/AllProjectsList/allProjectsListContainer';
import { AllTeamsListContainer } from '../components/AllTeamsList/allTeamsListContainer';
import { SettingsContainer } from '../components/Settings/settingsContainer';
import { useGetUserQuery, useRemoveMemberFromTeamMutation, useRemoveUserFromProjectMutation, useGetAllProjectsForUserQuery, useGetUserTeamsQuery, useUpdateUserProfileMutation, useUpdateEmailMutation, useUpdatePasswordMutation } from '../features/api/apiSlice';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import { useAuth } from '../context/authContext';
import ErrorMessage from '../components/ErrorMessage';

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

    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];

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

    const isLoading = projectsIsLoading || teamsIsLoading || userIsLoading;
    const hasError = projectsError || teamsError || userError;

    if (isLoading || hasError) {
        return (
            <div>
                <Navbar page="Settings" />
                <ErrorMessage loading={isLoading} error={hasError} />
                <Footer />
            </div>
        );
    }

    return (
        <div >
            <Navbar page="Settings" />
            <TabNav tabs={tabs} />

            <div className="min-h-screen">
            <SettingsContainer user={user} updateUserProfile={updateUserProfile} updateEmail={updateEmail}  updatePassword={updatePassword} projectMembers={projects} teamMembers={teams} removeUserFromProject={removeUserFromProject} removeMemberFromTeam={removeMemberFromTeam} />
            </div>

            <Footer />
        </div>
    );
}