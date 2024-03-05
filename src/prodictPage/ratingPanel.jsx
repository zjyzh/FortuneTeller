// import ReactMarkdown from 'react-markdown';
import RatingBox from "./ratingBox";
import './ratingPanel.css'



// Daily Fortune: 4 stars  
// Description: Today, your energy and enthusiasm are at their peak, led by your adventurous ENFJ personality. Awash with optimism, you find it easy to connect with others, making it an excellent day for networking. However, remember to take pauses and replenish your energy.
function RatingPanel(inforList) {
    if (!Array.isArray(inforList)) {
        if (Array.isArray(inforList.inforList)) {
            inforList = inforList.inforList
        }
        // console.log('inside info', inforList);
    }
    inforList = Array.isArray(inforList) ? inforList : []

    return (
        <div className='prodict-main-container'>
            <div className='prodict-main-box'>
                {inforList.map((item, index) => (
                    <RatingBox text={item.text} length={item.starNum} description={item.des} key={index} />
                ))}
            </div>
        </div>

    );
}

export default RatingPanel;
