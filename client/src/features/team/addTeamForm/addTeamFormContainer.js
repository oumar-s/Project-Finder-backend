import { useState } from "react";
import AddTeamFormView from "./addTeamFormView";
import { useAddTeamMutation, useAddMemberToTeamMutation } from "../../api/apiSlice";
import { useAuth } from "../../../context/authContext";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export function AddTeamFormContainer() {
    const auth = useAuth();
    const [teamForm, setTeamForm] = useState({
        teamName: '',
        teamDescription: '',
        teamIcon: '',
        teamBanner: ''
    });
    const [teamImage, setTeamImage] = useState(null);
    const [teamBanner, setTeamBanner] = useState(null);
    const [addTeam] = useAddTeamMutation();
    const [addMemberToTeam] = useAddMemberToTeamMutation();
    
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

    const handleTeamIconUpload = (setter) => (event) => {
        const file = event.target.files[0];
        setTeamForm({...teamForm, teamIcon: event.target.files[0]});
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setter(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };

    const handleTeamBannerUpload = (setter) => (event) => {
        const file = event.target.files[0];
        setTeamForm({...teamForm, teamBanner: event.target.files[0]});
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setter(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, " : ", value);
        setTeamForm(prev => ({
          ...prev,
          [name]: value
        }));
      };

    const handleAdd = async event => {
        event.preventDefault();
        //upload team icon
        if(teamForm.teamIcon?.name){
            const teamIconRef = ref(storage, `teamIcons/${teamForm.teamIcon.name}`);
            const uploadTask = uploadBytesResumable(teamIconRef, teamForm.teamIcon);
            await Promise.all([uploadTask]);
            const teamIconUrl = await getDownloadURL(teamIconRef);
            teamForm.teamIcon = teamIconUrl;
        }
        //upload team banner
        if(teamForm.teamBanner?.name){
            const teamBannerRef = ref(storage, `teamBanners/${teamForm.teamBanner.name}`);
            const uploadTask = uploadBytesResumable(teamBannerRef, teamForm.teamBanner);
            await Promise.all([uploadTask]);
            const teamBannerUrl = await getDownloadURL(teamBannerRef);
            teamForm.teamBanner = teamBannerUrl;
        }

        let team = {...teamForm};
        console.log('team form', team);
        const addedTeam = await addTeam(team);
        addMemberToTeam({teamId: addedTeam.data.id, userId: auth.user?.id});
        console.log('added team', addedTeam);
        setTeamForm({
            teamName: '',
            teamDescription: '',
            teamIcon: '',
            teamBanner: '',
        });
        setTeamImage(null);
        setTeamBanner(null);
    }
    
    return (
        <AddTeamFormView
            handleChange = {handleChange}
            handleAdd = {handleAdd}
            handleTeamIconUpload = {handleTeamIconUpload}
            handleTeamBannerUpload = {handleTeamBannerUpload}
            setTeamImage = {setTeamImage}
            setTeamBanner = {setTeamBanner}
            teamImage = {teamImage}
            teamBanner = {teamBanner}
            formData = {teamForm}
        />
    );
}
