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
    const handleSubmit = async event => {
        event.preventDefault();
        let project = {...projectForm};
        await addPost({project: project, teamId: params.teamId});
        setProjectForm({
            projectTitle: '',
            projectDescription: ''
        });
    }
    
    return (
        <AddProjectFormView
            handleTitleChange = {handleTitleChange} 
            handleDescriptionChange = {handleDescriptionChange}
            handleSubmit = {handleSubmit}
            formData = {projectForm}
        />
    );
}
