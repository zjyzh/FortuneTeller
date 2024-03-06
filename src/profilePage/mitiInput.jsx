import React, { useRef } from 'react';
import './mutiinput.css';

function MBTIInput({ inputs, setInputs }) {
    const inputRefs = inputs.map(() => useRef(null));

    const handleInputChange = (value, index) => {
        // 限制输入只能是 MBTI 的 16 人格中的字母：I, E, N, S, T, F, J, P
        if (/^[IENSTFJP]$/i.test(value)) { // Updated regex to match only MBTI letters
            const newInputs = [...inputs];
            newInputs[index] = value.toUpperCase();
            setInputs(newInputs);

            if (index < inputs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        } else {
            // 如果输入的不是 MBTI 字母，清空当前输入
            const newInputs = [...inputs];
            newInputs[index] = '';
            setInputs(newInputs);
            // 这里可以添加用户反馈，如弹窗警告、消息提示等
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && inputs[index] === "" && index > 0) {
            const newInputs = [...inputs];
            newInputs[index - 1] = '';
            setInputs(newInputs);
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <div className='MBTI-out'>
            {inputs.map((value, index) => (
                <input
                    className='MBTI'
                    key={index}
                    ref={inputRefs[index]}
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    style={{ textTransform: 'uppercase' }}
                />
            ))}
        </div>
    );
}

export default MBTIInput;
