import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
import AnimatedImageButton from './imgBut';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('second-page');
    };


    return (
        <div className="main">
            {/* <h1 className="fancy-title"> What should I eat today </h1> */}
            <div className="image-container">
                <img src="../logo.jpg" alt="描述" className="image" />
            </div>
            <h1 className='title'>Destiny Decoder</h1>
            <div className='main-button'>

                <AnimatedImageButton src={"../StartBut.png"} alt="描述性文本" onClick={handleClick} imgText={"Click Here To Start"} />
            </div>

        </div>
    )
}

export default MainPage;