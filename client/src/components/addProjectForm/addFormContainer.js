import { useState } from "react";
import AddProjectFormView from "./addProjectFormView";
import { useAddProjectMutation } from "../../features/api/apiSlice";

export function AddProjectFormContainer() {
    const [projectForm, setProjectForm] = useState({
        projectTitle: '',
        projectDescription: '',
        projectRepository: '',
        teamId: ''
    });
    const [addPost] = useAddProjectMutation();
    
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
            handleSubmit = {handleSubmit}
            formData = {projectForm}
        />
    );
}
