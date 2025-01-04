import ProfileView from "./settingsView";
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function SettingsContainer({ user, updateUserProfile, updateEmail, updatePassword, projectMembers, teamMembers, removeMemberFromTeam, removeUserFromProject }) {
  const [userForm, setUserForm] = useState({
    profilePic: user.profilePic,
    firstName: user.firstName,
    lastName: user.lastName,
    //email: user.email,
    bio: user.bio,
    skills: user.skills,
  });
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [emailForm, setEmailForm] = useState({ newEmail: '', confirmEmail: '' });
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showLeaveProjectConfirm, setShowLeaveProjectConfirm] = useState(null);
  const [showLeaveTeamConfirm, setShowLeaveTeamConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  // Replace success states with toast states
  const [showProfileToast, setShowProfileToast] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [showPasswordToast, setShowPasswordToast] = useState(false);
  const [showProjectToast, setShowProjectToast] = useState(false);
  const [showTeamToast, setShowTeamToast] = useState(false);
  console.log("user: ", user);
  console.log("projectMembers: ", projectMembers);
  console.log("teamMembers: ", teamMembers);

  // Add new loading and error states
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState(null);

  const handleProfilePicUpload = (setter) => (event) => {
    const file = event.target.files[0];
    setUserForm({ ...userForm, profilePic: event.target.files[0] });
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
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " : ", value);
    setEmailForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    console.log(name, " : ", value);
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfileInfo = async event => {
    event.preventDefault();
    setProfileLoading(true);
    setProfileError(null);
    try {
        console.log('submitting form');
        console.log('user form', userForm);
        if(userForm.profilePic?.name){
            const profilePicRef = ref(storage, `profilePics/${userForm.profilePic.name}`);
            const uploadTask = uploadBytesResumable(profilePicRef, userForm.profilePic);
            await Promise.all([uploadTask]);
            const profilePicUrl = await getDownloadURL(profilePicRef);
            userForm.profilePic = profilePicUrl;
        }

        let user = {...userForm};
        console.log('user form', user);
        await updateUserProfile(user);
        setUserForm({
            profilePic: user.profilePic,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            skills: user.skills,
        });
        setShowProfileToast(true);
        setTimeout(() => {
            setShowProfileToast(false);
        }, 3000);
    } catch (error) {
        setProfileError('Failed to update profile. Please try again.');
        console.error('Error updating profile:', error);
    } finally {
      setProfileLoading(false);
    }
}

  const showEmailConfirmation = () => {
    if (emailForm.newEmail === emailForm.confirmEmail) {
      setShowEmailConfirm(true);
      setEmailError('');
    } else {
      setEmailError('Emails do not match');
    }
  };

  const showPasswordConfirmation = () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setShowPasswordConfirm(true);
      setPasswordError('');
    } else {
      setPasswordError('Passwords do not match');
    }
  };

  const handleUpdateEmail = async () => {
    setAccountLoading(true);
    setAccountError(null);
    if (emailForm.newEmail === emailForm.confirmEmail) {
      // update email
      try {
        await updateEmail({ userId: user.id, newEmail: emailForm.newEmail });
        console.log('Updating email to:', emailForm.newEmail);
        // Reset form and error
        setEmailForm({ newEmail: '', confirmEmail: '' });
        setEmailError('');
        setShowEmailConfirm(false);
        setShowEmailToast(true);
        setTimeout(() => {
            setShowEmailToast(false);
        }, 3000);
      } catch (error) {
        setAccountError('Failed to update email. Please try again.');
        console.error('Error updating email:', error);
      } finally {
        setAccountLoading(false);
      }
    } else {
      setEmailError('Emails do not match');
    }
  };

  const handleUpdatePassword = async () => {
    setAccountLoading(true);
    setAccountError(null);
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // update password
      try {
        await updatePassword({ userId: user.id, newPassword: passwordForm.newPassword });
        console.log('Updating password');
        // Reset form and error
        setPasswordForm({ newPassword: '', confirmPassword: '' });
        setPasswordError('');
        setShowPasswordConfirm(false);
        setShowPasswordToast(true);
        setTimeout(() => {
            setShowPasswordToast(false);
        }, 3000);
      } catch (error) {
        setAccountError('Failed to update password. Please try again.');
        console.error('Error updating password:', error);
      } finally {
        setAccountLoading(false);
      }
    } else {
      setPasswordError('Passwords do not match');
    }
  };

  const leaveProject = async (projectId) => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      await removeUserFromProject(projectId);
      console.log("leave project success");
      setShowLeaveProjectConfirm(null);
      setShowProjectToast(true);
      setTimeout(() => {
          setShowProjectToast(false);
      }, 3000);
    }
    catch (error) {
      setProjectsError('Failed to leave project. Please try again.');
      console.error('Error leaving project:', error);
    } finally {
      setProjectsLoading(false);
    }
  }

  const leaveTeam = async (teamId) => {
    setTeamsLoading(true);
    setTeamsError(null);
    try {
      await removeMemberFromTeam(teamId);
      console.log("leave team success");
      setShowLeaveTeamConfirm(null);
      setShowTeamToast(true);
      setTimeout(() => {
          setShowTeamToast(false);
      }, 3000);
    }
    catch (error) {
      setTeamsError('Failed to leave team. Please try again.');
      console.error('Error leaving team:', error);
    } finally {
      setTeamsLoading(false);
    }
  }

  const confirmLeaveProject = () => {
    if (showLeaveProjectConfirm) {
      leaveProject(showLeaveProjectConfirm);
    }
  };

  const confirmLeaveTeam = () => {
    if (showLeaveTeamConfirm) {
      leaveTeam(showLeaveTeamConfirm);
    }
  };

  return (
    <ProfileView user={user} projectMembers={projectMembers} teamMembers={teamMembers} leaveProject={leaveProject} leaveTeam={leaveTeam} uploadProfilePic={handleProfilePicUpload} profilePic={profilePic} setProfilePic={setProfilePic} activeTab={activeTab} setActiveTab={setActiveTab} handleChange={handleChange} userForm={userForm} updateProfileInfo={updateProfileInfo} handleEmailChange={handleEmailChange} emailForm={emailForm} handleUpdateEmail={showEmailConfirmation} emailError={emailError} handlePasswordChange={handlePasswordChange} passwordForm={passwordForm} handleUpdatePassword={showPasswordConfirmation} passwordError={passwordError} showEmailConfirm={showEmailConfirm} setShowEmailConfirm={setShowEmailConfirm} showPasswordConfirm={showPasswordConfirm} setShowPasswordConfirm={setShowPasswordConfirm} confirmEmailUpdate={handleUpdateEmail} confirmPasswordUpdate={handleUpdatePassword} showLeaveProjectConfirm={showLeaveProjectConfirm} setShowLeaveProjectConfirm={setShowLeaveProjectConfirm} confirmLeaveProject={confirmLeaveProject} showLeaveTeamConfirm={showLeaveTeamConfirm} setShowLeaveTeamConfirm={setShowLeaveTeamConfirm} confirmLeaveTeam={confirmLeaveTeam} showProfileToast={showProfileToast} showEmailToast={showEmailToast} showPasswordToast={showPasswordToast} showProjectToast={showProjectToast} showTeamToast={showTeamToast} setShowProfileToast={setShowProfileToast} setShowEmailToast={setShowEmailToast} setShowPasswordToast={setShowPasswordToast} setShowProjectToast={setShowProjectToast} setShowTeamToast={setShowTeamToast} profileLoading={profileLoading} profileError={profileError} accountLoading={accountLoading} accountError={accountError} projectsLoading={projectsLoading} projectsError={projectsError} teamsLoading={teamsLoading} teamsError={teamsError} />
  )

}