import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation } from "../../api/apiSlice";

export function AddProjectFormContainer() {
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: ''
    });
    const [addPost] = useAddProjectMutation();
    
    //These event handlers keeps track of changes as the user fills out the form.
    //these event handlers will be passed to the AddProjectFormView as a prop.
    const handleTitleChange = (event) => {
        setProjectForm({...projectForm, title: event.target.value});
    }
    const handleDescriptionChange = (event) => {
        setProjectForm({...projectForm, description: event.target.value});
    }
    const handleSubmit = async event => {
        event.preventDefault();
        let project = {...projectForm};
        await addPost(project);
        setProjectForm({
            title: '',
            description: ''
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
