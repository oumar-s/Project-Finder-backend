import { useState } from "react";
import AddTaskFormView from "./addTaskFormView";
import { useAddTaskMutation } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";

export function AddTaskFormContainer() {
    const params = useParams();
    console.log('params', params);
    const [taskForm, setTaskForm] = useState({
        taskName: '',
        taskDescription: '',
        assignedTo: ''
    });
    const [addPost] = useAddTaskMutation();
    
    //These event handlers keeps track of changes as the user fills out the form.
    //these event handlers will be passed to the AddProjectFormView as a prop.
    const handleTaskNameChange = (event) => {
        setTaskForm({...taskForm, taskName: event.target.value});
    }
    const handleDescriptionChange = (event) => {
        setTaskForm({...taskForm, taskDescription: event.target.value});
    }

    const handleAssignedToChange = (event) => {
        setTaskForm({...taskForm, assignedTo: event.target.value});
    }
    const handleSubmit = async event => {
        event.preventDefault();
        let task = {...taskForm};
        await addPost({task: task, projectId: params.projectId});
        //set each input to empty
        setTaskForm({
            taskName: '',
            taskDescription: '',
            assignedTo: ''
        });
    }
    
    return (
        <AddTaskFormView
            handleTaskNameChange = {handleTaskNameChange} 
            handleDescriptionChange = {handleDescriptionChange}
            handleAssignedToChange = {handleAssignedToChange}
            handleSubmit = {handleSubmit}
            formData = {taskForm}
        />
    );
}
