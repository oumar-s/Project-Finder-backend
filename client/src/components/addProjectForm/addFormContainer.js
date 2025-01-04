import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation, useGetUserTeamsQuery, useAddUserToProjectMutation } from "../../features/api/apiSlice";
import { useAuth } from "../../context/authContext";
import ErrorMessage from "../ErrorMessage";

export function AddProjectFormContainer() {
  const { user } = useAuth();
    const [projectForm, setProjectForm] = useState({
        projectTitle: '',
        projectDescription: '',
        projectRepository: '',
        teamId: ''
    });
    const { data: userTeams, error: teamsError, isLoading: teamsLoading, isSuccess: teamsSuccess } = useGetUserTeamsQuery(user?.id);
    const [addPost, { isLoading: isCreating, error: createError }] = useAddProjectMutation();
    const [addUserToProject, { isLoading: isAddingUser, error: addUserError }] = useAddUserToProjectMutation();
    const [showToast, setShowToast] = useState(false);

    if (teamsLoading || isCreating || isAddingUser) {
        return <ErrorMessage loading={true} error={null} />;
    }

    if (teamsError || createError || addUserError) {
        return <ErrorMessage loading={false} error={teamsError || createError || addUserError} />;
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('projectForm', projectForm);
        let project = {...projectForm};
        const addedProject = await addPost({project: project, teamId: projectForm.teamId});
        console.log('addedProject', addedProject);
        //add user to project
        await addUserToProject({projectId: addedProject.data.id, userId: user.id});

        //set each input to empty
        setProjectForm({
            projectTitle: '',
            projectDescription: '',
            projectRepository: '',
            teamId: ''
        });

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }
    // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " : ", value);
    setProjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
    
    return (
        <AddProjectFormView
            handleChange = {handleChange}
            userTeams = {userTeams}
            handleSubmit = {handleSubmit}
            formData = {projectForm}
            showToast={showToast}
            setShowToast={setShowToast}
        />
    );
}
