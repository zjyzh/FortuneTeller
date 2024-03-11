import React, { useState } from 'react'; // Import useState

import './avatarProfile.css';
import AnimatedImageButton from '../mainPage/imgBut';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles';
import MBTIInput from './mitiInput';
import { ProfileContext } from '../context/profileContext';

const ProfilePage = () => {

    const [selectedAvatar, setSelectedAvatar] = useState(''); // Define useState here

    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Navigate to home page");
        navigate('/');
    };

    const handleAvatarChange = (e) => {
        setSelectedAvatar(e.target.value);
        // You might also want to set the gender here based on the selection
    };
    
    const handleSubmit = () => {
        // Get the selected avatar value
        const selectedAvatar = document.querySelector('input[name="avatar"]:checked')?.value;
        console.log("Selected Avatar:", selectedAvatar);
    
        // Determine the gender based on the selected avatar
        const gender = selectedAvatar === 'avatar1' ? 'male' : 'female';
        console.log("Gender:", gender);
    
        // Get the username from the input field
        const username = document.querySelector('.username-input input[type="text"]').value;
        console.log("Username:", username);
    
        // Validate the username (if empty)
        if (!username.trim()) {
            alert('Please enter a valid username.');
            console.error("Username is empty");
            return;
        }
    
        // Navigate to the profile page and pass the username and gender as query parameters
        console.log("Navigate to profile page with username:", username, "and gender:", gender);
        navigate('/profile-page', { state: { username, gender } });
    };

    return (
        <div className="profile-container">
            <div className='second-header'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={handleClick} imgText={""} />
                <h1 className='second-title'>Select an avatar to start</h1>
            </div>
            <div className='profile-body'>
                <div className='avatar-selection'>
                    <label className='avatar'>
                        <input type='radio' name='avatar' value='avatar1' onChange={handleAvatarChange} />
                        <img src='../man.png' alt='Avatar 1' style={{ filter: selectedAvatar === 'avatar1' ? 'none' : 'grayscale(100%)' }} />
                    </label>
                    <label className='avatar'>
                        <input type='radio' name='avatar' value='avatar2' onChange={handleAvatarChange} />
                        <img src='../woman.png' alt='Avatar 2' style={{ filter: selectedAvatar === 'avatar2' ? 'none' : 'grayscale(100%)' }} />
                    </label>
                </div>
                <div className='username-input'>
                    <input type='text' placeholder='Enter your username' />
                </div>
            </div>
            <div className="animated-image-button">
                <AnimatedImageButton src={"../StartBut.png"} size={{ width: '150px', height: '150px' }} alt="描述性文本" onClick={handleSubmit} imgText={"Continue"} />
            </div>
        </div>
    )
}

export default ProfilePage;
