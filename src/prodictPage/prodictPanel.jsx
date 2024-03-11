import React, { useState } from 'react';
import AnimatedImageButton from '../mainPage/imgBut';
import './inputPanel.css'
function ProdictPanel({ message, isRating }) {
   

    return (
        <div className='input-panel-container'>
            <div className='input-box-botton'>
                <AnimatedImageButton src={"../StartBut.png"} size={{ width: '120px', height: '120px' }} alt="描述性文本"  imgText={""} />
            </div>
        </div>
    );
}

export default ProdictPanel;
