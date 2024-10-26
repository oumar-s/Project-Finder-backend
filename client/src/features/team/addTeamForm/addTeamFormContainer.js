import { useState } from "react";
import AddTeamFormView from "./addTeamFormView";
import { useAddTeamMutation } from "../../api/apiSlice";

export function AddTeamFormContainer() {
    const [teamForm, setTeamForm] = useState({
        teamName: '',
        teamDescription: '',
        teamIcon: '',
        teamBanner: ''
    });
    const [addTeam] = useAddTeamMutation();
    
    //These event handlers keeps track of changes as the user fills out the form.
    //these event handlers will be passed to the AddProjectFormView as a prop.
    const handleTeamNameChange = (event) => {
        setTeamForm({...teamForm, teamName: event.target.value});
    }
    const handleTeamDescriptionChange = (event) => {
        setTeamForm({...teamForm, teamDescription: event.target.value});
    }
    const handleTeamIconChange = (event) => {
        setTeamForm({...teamForm, teamIcon: event.target.value});
    }
    const handleTeamBannerChange = (event) => {
        setTeamForm({...teamForm, teamBanner: event.target.value});
    }
    const handleAdd = async event => {
        event.preventDefault();
        let team = {...teamForm};
        await addTeam(team);
        setTeamForm({
            teamName: '',
            teamDescription: '',
            teamIcon: '',
            teamBanner: ''
        });
    }
    
    return (
        <AddTeamFormView
            handleTeamNameChange = {handleTeamNameChange} 
            handleTeamDescriptionChange = {handleTeamDescriptionChange}
            handleTeamIconChange = {handleTeamIconChange}
            handleTeamBannerChange = {handleTeamBannerChange}
            handleAdd = {handleAdd}
            formData = {teamForm}
        />
    );
}
