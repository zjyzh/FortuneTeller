// RatingBox.js
import React from 'react';
import './ratingBox.css'; // 确保CSS文件的名称和路径是正确的
import Star from './Star'; // 确保Star组件的路径是正确的

const RatingBox = ({ length, text, description }) => {
    const stars = Array.from({ length: length }, (_, index) => (
        <Star key={index} size="50px" /> // 星星的大小可以自定义
    ));

    return (
        <div className="rating-box">
            <div className='second-rating-main'>
                <div className='second-left'>
                    <p className='left-title'>{text}</p> {/* 使用传入的text作为标题 */}
                </div>
                <div className='second-right'>
                    <div className='star-container'> {stars}</div>
                </div>

            </div>
            <div className='rating-description-box'>
                <p className='rating-description-text'>{description}</p>
            </div>
        </div>
    );
};

export default RatingBox;
