import React, { useState } from 'react';
import AnimatedImageButton from '../mainPage/imgBut';
import './inputPanel.css'
function InputPanel({ onSendMessage, isTyping }) {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        // 调用父组件的方法，发送信息
        onSendMessage(message);
        // 清空输入框
        setMessage('');
    };

    const handleKeyPress = (e) => {
        // 检查是否是 Enter 键被按下
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='input-panel-container'>
            <textarea
                className='input-box-panel'
                type="text"
                value={message}
                onChange={handleChange}
            // onKeyDown={handleKeyPress}
            />
            <div className='input-box-botton'>
                <AnimatedImageButton isTyping={isTyping} src={"../StartBut.png"} size={{ width: '120px', height: '120px' }} alt="描述性文本" onClick={handleSend} imgText={"Click To Send"} />
            </div>

        </div>
    );
}

export default InputPanel;
