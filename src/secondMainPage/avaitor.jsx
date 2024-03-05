import React from 'react';
import './avaitor.css'; // 确保路径正确

function Avaitor({ src, alt, size, onClick, className, imgText }) {
    const divStyle = {
        width: size, // 使用传入的宽度
        height: size, // 使用传入的高度

    };

    const combinedClassName = `avaitor-image ${className || ''}`.trim();
    return (

        <img src={src} style={divStyle} alt={alt} className={combinedClassName} />

    );
}

export default Avaitor;
