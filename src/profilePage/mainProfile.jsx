
import './mainProfile.css';
import AnimatedImageButton from '../mainPage/imgBut';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles';
import MBTIInput from './mbtiInput';
import { ProfileContext } from '../context/profileContext';


const ProfilePage = () => {


    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    function generateRandomId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    const handleSubmit = () => {
        let missingFields = [];

        if (!userName) {
            missingFields.push("User Name");
        }
        if (!selectedDate) {
            missingFields.push("Date of Birth");
        }
        if (!birthPlace) {
            missingFields.push("Birth Place");
        }
        if (mbti.length < 4) {
            missingFields.push("MBTI (complete with 4 characters)");
        }

        // 如果有缺失字段，提示用户并返回
        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(", ")}.`);
            return;
        }

        const localProfile = {
            birthDate: selectedDate,
            birthPlace: birthPlace,
            job: job,
            relationshipStatus: relationshipStatus,
            hobbies: hobbies,
            mbti: mbti,
            userName: userName,
            id: generateRandomId(8)
        }
        // console.log(localProfile);
        let profileList = JSON.parse(localStorage.getItem('profileList'));
        profileList = profileList ? profileList : []
        profileList.push(localProfile)
        localStorage.setItem('profileList', JSON.stringify(profileList));
        navigate('/second-page');
    };


    // 这里添加你的选项
    const options = [
        { value: 'Single', label: 'Single' },
        { value: 'Lover', label: 'Lover' },
        { value: 'Married', label: 'Married' },
        // ...可以添加更多选项
    ];


    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleSelectChange = (event) => {
        setRelationshipStatus(event.target.value);
    };

    const {
        selectedDate,
        setSelectedDate,
        birthPlace,
        setBirthPlace,
        job,
        setJob,
        relationshipStatus,
        setRelationshipStatus,
        hobbies,
        mbti,
        setMbti,
        setHobbies,
        userName,
        setuserName,
    } = useContext(ProfileContext);

    // const { mbti, setMbti } = useContext(ProfileContext);

    // 将mbti字符串转换成数组形式以供MBTIInput使用
    const mbtiArray = mbti.split('');
    // 确保mbtiArray有4个字符，不足的用空字符串填充
    while (mbtiArray.length < 4) mbtiArray.push('');

    const handleSetMbti = (newInputs) => {
        // 将数组形式的MBTI转换回字符串形式并存储
        setMbti(newInputs.join(''));
    };




    return (
        <div className="profile-container">

            <div className='second-header'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={handleClick} imgText={""} />
                {/* <h1 className='second-title'>Select a Profile To Start</h1> */}
            </div>
            <div className='profile-body'>

                <h1 className='description'> Input User Name </h1>

                <input
                    type="text"
                    value={userName}
                    onChange={handleInputChange(setuserName)}
                    className='birth-place'
                />

                <h1 className='description'> What is your Date of Birth </h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>


                    {/* <StaticDatePicker orientation="landscape" /> */}
                    <DatePicker
                        size='large'
                        label="Select date"

                        value={selectedDate}
                        onChange={(newValue) => {
                            setSelectedDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        className="custom-datepicker"
                    />

                </LocalizationProvider>


                <h1 className='description'> What is your Birth Place </h1>

                <input
                    type="text"
                    value={birthPlace}
                    onChange={handleInputChange(setBirthPlace)}
                    className='birth-place'
                />

                <h1 className='description'> What is your MBTI </h1>

                <MBTIInput inputs={mbtiArray} setInputs={handleSetMbti} />

                <h1 className='description'> What is your job </h1>
                <input
                    type="text"
                    value={job}
                    onChange={handleInputChange(setJob)}
                    className='birth-place'
                />

                <h1 className='description'> What is your current relationship </h1>

                <select value={relationshipStatus} onChange={handleSelectChange} className='relation'>
                    {/* <option value="">Select an option</option> */}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <h1 className='description'> What are your hobbies </h1>

                <input
                    type="text"
                    value={hobbies}
                    onChange={handleInputChange(setHobbies)}
                    className='birth-place'
                />
            </div>
            <div className="animated-image-button">
                <AnimatedImageButton src={"../StartBut.png"} size={{ width: '150px', height: '150px' }} alt="描述性文本" onClick={handleSubmit} imgText={"Click Here To Submit"} />
            </div>

        </div>
    )
}

export default ProfilePage;