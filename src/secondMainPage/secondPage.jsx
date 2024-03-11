import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './secondPage.css';
import AnimatedImageButton from '../mainPage/imgBut';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useNavigate } from 'react-router-dom';
// import Avaitor from './avaitor';
import Profile from './profile';
import CustomButton from './customButton';
import { useEffect, useState } from 'react';

const SecondPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    const [profileList, setProfileList] = useState([]);

    const handleCreateProfile = () => {
        // navigate('/profile-page');
        navigate('/avatar-profile-page');
    };

    useEffect(() => {

        let profileList = JSON.parse(localStorage.getItem('profileList'));
        profileList = profileList ? profileList : [];
        setProfileList(profileList)
        console.log("[SecondPage] ", profileList)

    }, [])

    const handleProfileClick = (id) => {
        navigate('/detail-page', { state: { id } });
    };

    const handleDeleteClick = (id) => {
        console.log("[SecondPage] delete,", id)
        const isConfirmed = confirm("Are you sure you want to delete this profile?");

        if (isConfirmed) {
            setProfileList((profilelist) => {
                let newList = profilelist.filter((val) => val.id != id);
                localStorage.setItem('profileList', JSON.stringify(newList));

                return newList
            })

        }

    };



    return (
        <div className="second-container">

            <div className='second-header'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={handleClick} imgText={""} />
                <h1 className='second-title'>Select a Profile To Start</h1>
            </div>

            <div className='second-page-main'>
                {/* 显示已有的profile */}
                <div className='second-profile-container'>
                    {profileList.map((item, idx) => {
                        let num = idx + 1
                        let profileName = "USER" + num
                        return (
                            <Profile deleteClick={handleDeleteClick} key={item.id} src={item.gender == "female"? '../woman.png':'../man.png'} size={'250px'} name={item.userName} id={item.id} onClick={() => handleProfileClick(item.id)}></Profile>
                        )
                    })}

                </div>
                <CustomButton text="No Profile Yet? Create one!" onClick={handleCreateProfile}></CustomButton>
            </div>
        </div>
    )
}

export default SecondPage;