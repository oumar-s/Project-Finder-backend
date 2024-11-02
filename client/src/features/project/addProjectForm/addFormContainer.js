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
        projectRepository: ''
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

    const handleRepositoryChange = (event) => {
        setProjectForm({...projectForm, projectRepository: event.target.value});
    }
    const handleSubmit = async event => {
        event.preventDefault();
        let project = {...projectForm};
        await addPost({project: project, teamId: params.teamId});
        //set each input to empty
        setProjectForm({
            projectTitle: '',
            projectDescription: '',
            projectRepository: ''
        });
    }
    
    return (
        <AddProjectFormView
            handleTitleChange = {handleTitleChange} 
            handleDescriptionChange = {handleDescriptionChange}
            handleRepositoryChange = {handleRepositoryChange}
            handleSubmit = {handleSubmit}
            formData = {projectForm}
        />
    );
}
