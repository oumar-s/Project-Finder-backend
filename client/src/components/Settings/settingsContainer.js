import ProfileView from "./settingsView";
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export function SettingsContainer({ user, updateUserProfile, projectMembers, teamMembers }) {
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

  const [activeTab, setActiveTab] = useState('profile');
  console.log("user: ", user);
  console.log("projectMembers: ", projectMembers);
  console.log("teamMembers: ", teamMembers);

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
    console.log('submitting form');
    console.log('user form', userForm);
    //upload team icon and banner to firebase storage
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
        profilePic: '',
        firstName: '',
        lastName: '',
        //email: '',
        bio: '',
        skills: '',
    });
    //setProfilePic(null);
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

  const updateEmail = async () => {
    if (emailForm.newEmail === emailForm.confirmEmail) {
      // Call Firebase function to update email
      console.log('Updating email to:', emailForm.newEmail);
      // Reset form and error
      setEmailForm({ newEmail: '', confirmEmail: '' });
      setEmailError('');
      setShowEmailConfirm(false);
    } else {
      setEmailError('Emails do not match');
    }
  };

  const updatePassword = async () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // Call Firebase function to update password
      console.log('Updating password');
      // Reset form and error
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      setPasswordError('');
      setShowPasswordConfirm(false);
    } else {
      setPasswordError('Passwords do not match');
    }
  };

  return (
    <ProfileView user={user} projectMembers={projectMembers} teamMembers={teamMembers} uploadProfilePic={handleProfilePicUpload} profilePic={profilePic} setProfilePic={setProfilePic} activeTab={activeTab} setActiveTab={setActiveTab} handleChange={handleChange} userForm={userForm} updateProfileInfo={updateProfileInfo} handleEmailChange={handleEmailChange} emailForm={emailForm} updateEmail={showEmailConfirmation} emailError={emailError} handlePasswordChange={handlePasswordChange} passwordForm={passwordForm} updatePassword={showPasswordConfirmation} passwordError={passwordError} showEmailConfirm={showEmailConfirm} setShowEmailConfirm={setShowEmailConfirm} showPasswordConfirm={showPasswordConfirm} setShowPasswordConfirm={setShowPasswordConfirm} confirmEmailUpdate={updateEmail} confirmPasswordUpdate={updatePassword} />
  )

}