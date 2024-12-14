import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation, useGetUserTeamsQuery } from "../../features/api/apiSlice";
import { useAuth } from "../../context/authContext";

export function AddProjectFormContainer() {
  const { user } = useAuth();
    const [projectForm, setProjectForm] = useState({
        projectTitle: '',
        projectDescription: '',
        projectRepository: '',
        teamId: ''
    });
    const { data: userTeams, error: teamsError, isLoading: teamsLoading, isSuccess: teamsSuccess } = useGetUserTeamsQuery(user?.id);
    const [addPost] = useAddProjectMutation();

    if (teamsLoading) {
        return <div>Loading...</div>;
      }
    
    if (teamsError) {
        return <div>Error: {teamsError?.message}</div>;
      }
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('projectForm', projectForm);
        let project = {...projectForm};
        await addPost({project: project, teamId: projectForm.teamId});
        //set each input to empty
        setProjectForm({
            projectTitle: '',
            projectDescription: '',
            projectRepository: '',
            teamId: ''
        });
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
        />
    );
}
