import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import AnimatedImageButton from '../mainPage/imgBut';
import MBTIInput from './mitiInput';
import './mainProfile.css'

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [birthPlace, setBirthPlace] = useState('');
    const [mbti, setMbti] = useState('');
    const { username, gender } = location.state || {};

    const handleSubmit = () => {
        let missingFields = [];
        if (!selectedDate) missingFields.push("Date of Birth");
        if (!birthPlace.trim()) missingFields.push("Birth Place");
        if (mbti.length < 4) missingFields.push("MBTI (complete with 4 characters)");

        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(", ")}.`);
            return;
        }

        console.log("[MainProfile] Form Submitted. Data:", {username, gender, selectedDate, birthPlace, mbti });

        const username_in = username;
        const gender_in = gender;
        const birthDate_in = selectedDate;
        const birthPlace_in = birthPlace;
        const mbti_in = mbti;
        
        // Perform further actions here, like saving the data
        navigate('/second-profile-page', {state: {
                username_in,
                gender_in,
                birthDate_in,
                birthPlace_in,
                mbti_in
            }
        });
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    // Convert MBTI string into array format for MBTIInput component
    const mbtiArray = mbti.split('');
    // Ensure mbtiArray has 4 characters, fill missing with empty string
    while (mbtiArray.length < 4) mbtiArray.push('');

    return (
        <div className="profile-page-container">
            <div className='logo-header-container'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={() => navigate('/avatar-profile-page')} imgText={""} />
                <h1 className='second-title'>Let me know more about you...</h1>
            </div>
            <div className='profile-body-container'>
                <div className='input-container DOB'>
                    <h1 className='description'>Date of Birth</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            label="Select date"
                            value={selectedDate} 
                            onChange={setSelectedDate}
                            renderInput={(params) => <TextField {...params} />}
                            className='customDatePicker'
                        />
                        
                    </LocalizationProvider>
                </div>
                <div className='input-container BP'>
                    <h1 className='description'>Birth Place</h1>
                    <input
                        type="text"
                        value={birthPlace}
                        onChange={handleInputChange(setBirthPlace)}
                        className='input-box'
                    />
                </div>
                <div className='input-container '>
                    <h1 className='description'>MBTI</h1>
                    <MBTIInput inputs={mbtiArray} setInputs={(newInputs) => setMbti(newInputs.join(''))} />
                </div>

                <div className="animated-image-button">
                    <AnimatedImageButton src="../StartBut.png" alt="Submit" onClick={handleSubmit} imgText="Click Here To Continue" />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;