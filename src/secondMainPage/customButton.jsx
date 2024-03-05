import React from 'react';
import './customButton.css'; // 确保路径正确

function CustomButton({ text, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default CustomButton;
