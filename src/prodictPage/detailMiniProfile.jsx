import React from 'react';
// import './avaitor.css'; // 确保路径正确
import Avaitor from '../secondMainPage/avaitor';
import { useState, useRef, useEffect } from 'react';
import './detailMiniProfile.css'

function DetailMiniProfile({ src, alt, size, name, onClick, deleteClick, id, imgText }) {

    const [fontSize, setFontSize] = useState(48); // 初始字号，可以根据需要调整
    const textRef = useRef(null);


    useEffect(() => {
        const adjustFontSize = () => {
            if (textRef.current) {
                const parentWidth = textRef.current.offsetWidth;
                const parentHeight = textRef.current.offsetHeight;
                let dynamicSize = Math.min(parentWidth, parentHeight) / name.length;

                // 根据实际情况调整这个比例
                dynamicSize = Math.max(dynamicSize, 10); // 设置最小字号，避免字体过小
                dynamicSize = Math.min(dynamicSize, 40); // 设置最大字号，避免字体过大

                setFontSize(dynamicSize);
            }
        };

        adjustFontSize();
        // 可以添加事件监听器来处理窗口大小变化
        window.addEventListener('resize', adjustFontSize);

        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, [name, size]);  // 依赖项列表中包含 `name` 和 `size`，以便在这些属性变化时重新计算


    const divStyle = {
        width: size, // 使用传入的宽度
        height: size,
        fontSize: `${fontSize}px`, // 使用动态计算的字号
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // 避免文字溢出
    };

    if (id == 'e') {
        src = '../../que.png'
    }

    return (

        <div className='profile-wrapper'>
            <div className='detail-profile-main' onClick={() => onClick(name)}>
                <Avaitor className='profile-avaitor' src={src} alt={alt} size={size}></Avaitor>
                <div style={divStyle} className='profile-name' ref={textRef}>{name}</div>

            </div>
        </div>

    );
}

export default DetailMiniProfile;
