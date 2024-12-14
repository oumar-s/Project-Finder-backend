import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation } from "../../api/apiSlice";
import { useParams } from "react-router-dom";

export function AddProjectFormContainer() {
    const params = useParams();
    console.log('params', params);
    const [projectForm, setProjectForm] = useState({
        projectTitle: '',
        projectDescription: '',
        projectRepository: '',
        teamId: ''
    });
    
    const [addPost] = useAddProjectMutation();
    
    //These event handlers keeps track of changes as the user fills out the form.
    //these event handlers will be passed to the AddProjectFormView as a prop.
    const handleTitleChange = (event) => {
        setProjectForm({...projectForm, projectTitle: event.target.value});
    }
    const handleDescriptionChange = (event) => {
        setProjectForm({...projectForm, projectDescription: event.target.value});
    }

    const handleTeamChange = (event) => {
        setProjectForm({...projectForm, teamId: event.target.value});
    }

    const handleRepositoryChange = (event) => {
        setProjectForm({...projectForm, projectRepository: event.target.value});
    }
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('projectForm', projectForm);
        let project = {...projectForm};
        await addPost({project: project, teamId: params.teamId});
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
            handleSubmit = {handleSubmit}
            formData = {projectForm}
        />
    );
}
