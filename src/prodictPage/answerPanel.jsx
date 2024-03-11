import ReactMarkdown from 'react-markdown';
import AnimatedImageButton from '../mainPage/imgBut';
// import RatingBox from './ratingBox';
import RatingPanel from './ratingPanel';
import MarkdownComponent from '../MarkdownComponent';
import EmptyPanel from './emptyPanel';
import './answerPanel.css'

function AnswerPanel({ starText, markdownText, isRating, isLeft, inforList, isTyping, profileData }) {

    // console.log("[AnswerPanel][ProfileData]",profileData);
    // console.log("[AnswerPanel][ProfileData]",profileData[0].gender);
    const panelStyle = {
        marginLeft: isLeft ? '-20vw' : '10vw'
    };

    const buttonStyle = {
        marginRight: isLeft ? '40px' : '0px',
        marginLeft: isLeft ? '0px' : '40px'
    }

    const buttonImg = isLeft ? "../../logo.jpg" : (profileData[0].gender == "male" ? "../../man.png" : "../../woman.png")

    // console.log("infolist", inforList);

    if (isTyping) {
        return (<div className='answer-panel-container' style={panelStyle}><div className='answer-panel-button' style={buttonStyle}>
            <AnimatedImageButton isTyping={isTyping} src={buttonImg} size={{ width: '120px', height: '120px' }} alt="描述性文本" imgText={""} /></div>
            <div className='answer-panel-main'> <EmptyPanel /> </div>
        </div>
        )
    }

    return (<div className='answer-panel-container' style={panelStyle}>

        {isLeft && <div className='answer-panel-button' style={buttonStyle}>
            <AnimatedImageButton src={buttonImg} size={{ width: '120px', height: '120px' }} alt="描述性文本" imgText={""} />
        </div>}
        {
            isRating ? <div className='answer-panel-main'><RatingPanel inforList={inforList}></RatingPanel> </div> : <div className='answer-panel-main'> <MarkdownComponent markdownText={markdownText} /> </div>
        }

        {!isLeft && <div className='right-answer-panel-button' style={buttonStyle}>
            <AnimatedImageButton src={buttonImg} size={{ width: '120px', height: '120px' }} alt="描述性文本" imgText={""} />
        </div>}

    </div>)
}

export default AnswerPanel;