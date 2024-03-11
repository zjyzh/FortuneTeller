import './secondProfile.css';
import AnimatedImageButton from '../mainPage/imgBut';
import { useNavigate, useLocation} from 'react-router-dom';
import React, { useContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles';
import MBTIInput from './mitiInput';
import { ProfileContext } from '../context/profileContext';


const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username_in, gender_in, birthDate_in, birthPlace_in, mbti_in } = location.state || {};
    // console.log("info Passed in", { username_in, gender_in, birthDate_in, birthPlace_in, mbti_in });
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
        const localProfile = {
            birthDate: birthDate_in,
            birthPlace: birthPlace_in,
            job: job,
            relationshipStatus: relationshipStatus,
            hobbies: hobbies,
            mbti: mbti_in,
            userName: username_in,
            gender: gender_in,
            id: generateRandomId(8)
        }
        
        // console.log(localProfile);
        let profileList = JSON.parse(localStorage.getItem('profileList'));
        profileList = profileList ? profileList : []
        profileList.push(localProfile)
        localStorage.setItem('profileList', JSON.stringify(profileList));

        console.log("Local Profile: ",localProfile);
        console.log("Profile List",profileList);
        navigate('/second-page');
    };


    // 这里添加你的选项
    const options = [
        { value: 'Single', label: 'Single' },
        { value: 'Lover', label: 'Lover' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
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
        <div className="profile-page-container">
            <div className='logo-header-container'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={() => navigate('/profile-page')} imgText={""} />
                <h1 className='second-title'>Just a little bit more...</h1>
            </div>

            <div className='profile-body-container'>
                <div className='input-container Job'>
                    <h1 className='description'> Profession </h1>
                    <input
                        type="text"
                        value={job}
                        onChange={handleInputChange(setJob)}
                        className='input-box Job'
                    />
                </div>
                <div className='input-container MS'>
                    <h1 className='description'> Marital Status</h1>
                    <select value={relationshipStatus} onChange={handleSelectChange} className='relation'>
                        {/* <option value="">Select an option</option> */}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-container Hb'>
                    <h1 className='description'> Hobbies </h1>
                    <input
                        type="text"
                        value={hobbies}
                        onChange={handleInputChange(setHobbies)}
                        className='input-box Hb'
                    />
                </div>
            </div>
            <div className="animated-image-button">
                <AnimatedImageButton src={"../StartBut.png"} alt="描述性文本" onClick={handleSubmit} imgText={"Click Here To Submit"} />
            </div>

        </div>
    )
}

export default ProfilePage;