import React from 'react';
import './imgBut.css'; // 确保路径正确

function AnimatedImageButton({ src, alt, onClick, imgText, size, isTyping, className, borderRadious }) {
  // 默认大小，如果未提供size参数
  const defaultSize = { width: '200px', height: '200px' };

  // 合并传入的size和默认大小
  const imageSize = { ...defaultSize, ...size };
  // 修改后的点击处理函数，允许传递额外的参数
  const handleClick = (event) => {
    if (isTyping) {
      // 如果处于typing状态，则不执行任何操作
      return;
    } else if (onClick) {
      // 调用onClick，根据其是否需要参数来决定是否传递event
      onClick(event);
    }
  };
  const combinedClassName = `image-button ${className || ''}`.trim();

  const myBorderRadious = borderRadious ? borderRadious : '50%';

  return (
    <div style={{ width: imageSize.width, height: imageSize.height }} className={`image-button-container ${isTyping ? 'typing' : ''}`} onClick={handleClick}>
      <img
        src={src}
        alt={alt}
        className={combinedClassName}
        style={{ width: imageSize.width, height: imageSize.height, borderRadius: myBorderRadious }}
      />
      {isTyping ? <div className="typing-animation"></div> : <div className="click-here">{imgText}</div>}
    </div>
  );
}

export default AnimatedImageButton;
