import React from 'react';
// import './avaitor.css'; // 确保路径正确
import Avaitor from './avaitor';
import './profile.css'
import AnimatedImageButton from '../mainPage/imgBut';

function Profile({ src, alt, size, name, onClick, deleteClick, id, imgText }) {


    // 注意这个函数现在接收一个event参数
    // const handleClick = (event, customParam) => {
    //     console.log('Button was clicked with params', customParam);
    //     // 你可以访问event对象
    //     console.log(event.type);
    // };
    return (


        <div>
            <AnimatedImageButton className={"profile-avaitor-delete-btn"} src={'../../delete.png'} size={{ width: '50px', height: '50px' }} onClick={() => deleteClick(id)} ></AnimatedImageButton>

            <div className='second-profile-main' onClick={() => onClick(name)}>

                <Avaitor className='profile-avaitor' src={src} alt={alt} size={size}></Avaitor>
                <span className='profile-name'>{name}</span>
            </div>
        </div>

    );
}

export default Profile;
