import { useState } from "react";
import AddTaskFormView from "./addTaskFormView";
import { useAddTaskMutation, useGetProjectMembersQuery } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";

export function AddTaskFormContainer() {
    const params = useParams();
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    console.log('params', params);
    const [taskForm, setTaskForm] = useState({
        taskName: '',
        taskDescription: '',
        assignedTo: ''
    });
    const [addPost] = useAddTaskMutation();
    
    if (membersLoading) {
        return <div>Loading...</div>;
      }
    if (membersError) {
        return <div>There was an error</div>;
    }
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
     // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " : ", value);
    setTaskForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
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
            members = {members}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            formData = {taskForm}
        />
    );
}
