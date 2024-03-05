// Star.js
import React from 'react';
import './star.css'
// import starImage from './path-to-your-star-image/star.png'; // 确保star.png的路径正确

const Star = ({ size }) => {
    const style = {
        display: 'block', // 使得img标签不受默认的行内样式影响
        width: size, // 宽度由父组件决定
        height: size, // 高度与宽度相同以形成正方形
        objectFit: 'cover', // 保持图片比例不变，填满容器
    };

    return <img src={"../../star.png"} alt="Star" style={style} className='star-single' />;
};

export default Star;
