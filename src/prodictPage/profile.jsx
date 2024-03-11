import React from 'react';
// import './avaitor.css'; // 确保路径正确
import Avaitor from '../secondMainPage/avaitor';
import './profile.css'

function Profile({ src, alt, size, name, onClick, deleteClick, id, imgText }) {


    // 注意这个函数现在接收一个event参数
    // const handleClick = (event, customParam) => {
    //     console.log('Button was clicked with params', customParam);
    //     // 你可以访问event对象
    //     console.log(event.type);
    // };
    return (

        <div className='profile-wrapper'>
            <div onClick={() => onClick(name)}>
                <Avaitor className='profile-avaitor' src={src} alt={alt} size={size}></Avaitor>
                <div className='profile-name'>{name}</div>
            </div>
        </div>

    );
}

export default Profile;
