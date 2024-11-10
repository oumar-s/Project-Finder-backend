import { useState } from "react";
import AddTeamFormView from "./addTeamFormView";
import { useAddTeamMutation } from "../../api/apiSlice";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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
        console.log('file', event.target.files[0]);
        setTeamForm({...teamForm, teamIcon: event.target.files[0]});
    }
    const handleTeamBannerChange = (event) => {
        setTeamForm({...teamForm, teamBanner: event.target.files[0]});
    }
    const handleAdd = async event => {
        event.preventDefault();
        //upload team icon and banner to firebase storage
        const teamIconRef = ref(storage, `teamIcons/${teamForm.teamIcon.name}`);
        const teamBannerRef = ref(storage, `teamBanners/${teamForm.teamBanner.name}`);
        const uploadTask1 = uploadBytesResumable(teamIconRef, teamForm.teamIcon);
        const uploadTask2 = uploadBytesResumable(teamBannerRef, teamForm.teamBanner);
        await Promise.all([uploadTask1, uploadTask2]);
        const teamIconUrl = await getDownloadURL(teamIconRef);
        const teamBannerUrl = await getDownloadURL(teamBannerRef);
        teamForm.teamIcon = teamIconUrl;
        teamForm.teamBanner = teamBannerUrl;

        let team = {...teamForm};
        console.log('team form', team);
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
