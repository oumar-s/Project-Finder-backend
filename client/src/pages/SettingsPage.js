import React from 'react';
import { SettingsContainer } from '../components/Settings/settingsContainer';
import { useGetUserQuery, useRemoveMemberFromTeamMutation, useRemoveUserFromProjectMutation, useGetAllProjectsForUserQuery, useGetUserTeamsQuery, useUpdateUserProfileMutation, useUpdateEmailMutation, useUpdatePasswordMutation } from '../features/api/apiSlice';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import TabNav from '../components/TabNav';
import ErrorMessage from '../components/ErrorMessage';

export default function SettingsPage() {
    const { data: user, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: projects, projectsError, projectsIsLoading } = useGetAllProjectsForUserQuery(user?.id);
    const { data: teams, teamsError, teamsIsLoading } = useGetUserTeamsQuery(user?.id);
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();
    const [removeUserFromProject] = useRemoveUserFromProjectMutation();
    const [updateEmail] = useUpdateEmailMutation();
    const [updatePassword] = useUpdatePasswordMutation();

    const tabs = [{id: 1, name: 'My teams', link: "/profile/teams"}, {id: 2, name: "Explore", link: "/teams"}];

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