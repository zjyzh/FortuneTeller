import ReactMarkdown from 'react-markdown';
import './MarkdownComponent.css'

function MarkdownComponent({ markdownText, isTyping }) {
    if (isTyping) {
        return <p>Generating...</p>; // 或者你想要的任何加载指示器
    }

    return <ReactMarkdown className='markdown-panel' >{markdownText}</ReactMarkdown>;
}

export default MarkdownComponent;
