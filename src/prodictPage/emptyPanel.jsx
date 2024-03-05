// import ReactMarkdown from 'react-markdown';
import './emptyPanel.css'



// Daily Fortune: 4 stars  
// Description: Today, your energy and enthusiasm are at their peak, led by your adventurous ENFJ personality. Awash with optimism, you find it easy to connect with others, making it an excellent day for networking. However, remember to take pauses and replenish your energy.
function EmptyPanel() {

    return (
        <div className='empty-main-container'>
            <div className='empty-main-box'>
              Generating<span className="dots">...</span>
            </div>
        </div>

    );
}

export default EmptyPanel;
