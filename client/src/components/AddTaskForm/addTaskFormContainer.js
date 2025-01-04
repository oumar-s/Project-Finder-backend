import { useState } from "react";
import AddTaskFormView from "./addTaskFormView";
import { useAddTaskMutation, useGetProjectMembersQuery } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

export function AddTaskFormContainer() {
    const params = useParams();
    const { data: members, error: membersError, isLoading: membersLoading } = useGetProjectMembersQuery(params.projectId);
    console.log('params', params);
    const [taskForm, setTaskForm] = useState({
        taskName: '',
        taskDescription: '',
        assignedTo: ''
    });
    const [addPost, { isLoading: isCreating, error: createError }] = useAddTaskMutation();
    const [showToast, setShowToast] = useState(false);
    
    if (membersLoading || isCreating) {
        return <ErrorMessage loading={true} error={null} />;
    }

    if (membersError || createError) {
        return <ErrorMessage loading={false} error={membersError || createError} />;
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

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }
    
    return (
        <AddTaskFormView
            members = {members}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            formData = {taskForm}
            showToast={showToast}
            setShowToast={setShowToast}
        />
    );
}
