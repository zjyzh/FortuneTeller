
import './prodictDetail.css';
import AnimatedImageButton from '../mainPage/imgBut';
import { useNavigate } from 'react-router-dom';
// import RatingBox from './ratingBox';
import Profile from './profile';
import RatingPanel from './ratingPanel';
import InputPanel from './inputPanel';
import AnswerPanel from './answerPanel';
import { ProfileContext } from '../context/profileContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


const API_KEY = "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"

localStorage.setItem('clickedprofileList',[])

const ProdictDetail = () => {


    const location = useLocation();
    const { id } = location.state; // 从状态中提取ID


    const [prodictText, setProdictText] = useState("");

    function parseTextToFortuneList(text) {
        const sections = text.split('\n\n');
        const fortunesList = [];

        try {
            sections.forEach((section) => {
                const parts = section.split('\n');
                if (parts.length >= 2) {
                    const [titlePart, ...descriptionParts] = parts;
                    const title = titlePart.split(':')[0].trim();
                    const starNum = parseInt(titlePart.match(/(\d+)/)[0], 10);
                    const description = descriptionParts.join(' ').slice(12).trim(); // Adjusted to slice from 'Description: '

                    fortunesList.push({
                        text: title,
                        starNum: starNum,
                        des: description,
                    });
                }
            });
        } catch (error) {
            console.error("Error processing message:", error);
            return [];
        } finally {
            // setIsTyping(false);
        }


        return fortunesList;
    }



    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    const [profileList, setprofileList] = useState([])
    const [profileData, setProfileData] = useState({});


    const initialized = useRef(false);

    useEffect(() => {

        if (!initialized.current) {
            initialized.current = true;


            let summaryText = `
            You are an advanced chatbot designed specifically for a horoscope application. Your task is to provide users with personalized fortunes in three key areas: Daily Fortune, Career Fortune, and Love Fortune. For each fortune area, your first answer should be:


            Career in the future, Love status.
        your answer should follow this format:
        Daily : x stars ( provide a number from 1 to 5, represent the daily fortune star number )
        Description: (Provide a description about this result, limit your result into 100 words)
        Career : x stars ( provide a number from 1 to 5, represent the future career fortune star number )
        Description: (Provide a description about this result, limit your result into 100 words)
        Love : x stars ( provide a number from 1 to 5, represent the love fortune star number )
        Description: (Provide a description about this result, limit your result into 100 words)
        \n 
        `;

            let profilelist = (JSON.parse(localStorage.getItem('profileList')));
            let tprofileData = profilelist.filter(element => element.id === id);
            setProfileData(tprofileData);

            handleSendRequest(summaryText);

        }
    }, []); // 空依赖数组意味着这个副作用只在组件挂载时运行一次

    const [panelData, setPanelData] = useState([
        {
            isRating: true,
            isLeft: true,
            markdownText: "",
            inforList: [
                { text: "Daily", length: 3, des: "Description of item 1" },
                { text: "Career", length: 2, des: "Description of item 2" },
                { text: "Love", length: 5, des: "Description of item 3" }
            ],
            isTyping: true,
        },

    ]);

    // 组件其它部分...




    const updateFirstInforList = (newInforList) => {
        // 创建panelData的副本
        setPanelData(oldPanelData => {
            const newData = [...oldPanelData];
            newData[0] = {
                ...newData[0],
                inforList: newInforList,
                isTyping: false,
            };
            return newData;
        });


        // console.log("panelData", panelData);
    };

    const updateLastInforList = (markdownData) => {
        // 创建panelData的副本
        // const newData = [...panelData];



        // 使用新的panelData更新状态
        setPanelData((oldPanelData) => {
            const last = oldPanelData.length - 1;
            // console.log("[PredictPage] new data last", last)
            // console.log("[PredictPage] before new data", oldPanelData)
            // 更新第一个元素的inforList
            oldPanelData[last] = {
                ...oldPanelData[last],
                markdownText: markdownData,
                isTyping: false
            };
            // console.log("[PredictPage] after new panel data", oldPanelData)
            return [...oldPanelData]
        });
        // console.log("[...newData]", [...panelData]);
    };





    const [messages, setMessages] = useState([

    ]);

    const [markdown, setMarkdown] = useState("welcome!");

    const [isTyping, setIsTyping] = useState(false);
    const [progress, setProgress] = useState(0);

    // useEffect(() => {

    const hasUpdatedFirstInforList = useRef(false); // Add this ref

    // }, [isTyping]);
    const handleShowCreatedProfile = async() =>{
        let profileList = JSON.parse(localStorage.getItem('profileList'));
        profileList = profileList ? profileList : [];
        //alert(profileList)
        setprofileList(profileList)
        
    }
    const handleProfileClick = async(item) =>{
        let idList = []
        idList.push(id)
        idList.push(item.id)
        // console.log(idList)
        localStorage.setItem('clickedprofileList', idList);
        navigate('/similary-page');
        // if(clickedprofileList.length === 2){
        //     navigate('/similary-page');
        //     // localStorage.setItem('clickedprofileList', JSON.stringify([]));
        // }else{
        //     clickedprofileList.push(item)
        //     localStorage.setItem('clickedprofileList', JSON.stringify(clickedprofileList));
        //     if(clickedprofileList.length === 2){
        //         navigate('/similary-page');
        //     }else{
        //         alert('please choose at least two profiles!')
        //     }
            
        // }

        
    }

    const handleSendRequest = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user",
        };


        setIsTyping(true);
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        console.log("[PredictPage][SendRequest]", [...messages, newMessage])

        try {
            const response = await processMessageToChatGPT([...messages, newMessage]);
            // console.log("[PredictPage][Response]",response)
            const content = response.choices[0]?.message?.content;
            if (content) {
                const chatGPTResponse = {
                    message: content,
                    sender: "ChatGPT",
                };
                setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
                setProdictText(content);
            }
            console.log("[PredictPage][ReplyContent]",content);
        } catch (error) {
            console.error("[PredictPage][ReplyContent]Error processing message:", error);
        } finally {
            setIsTyping(false);
            // updateTypingStatus(false);
        }
    };

    async function processMessageToChatGPT(chatMessages) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role, content: messageObject.message };
        });



        const apiRequestBody = {
            "model": "gpt-4-turbo-preview",
            "messages": [
                {
                    role: "system", content: `you are a fortune teller, Based on the user provided information: 
                - Date of Birth: ${profileData.birthDate}
                - Birth Place: ${profileData.birthPlace}
                - MBTI Type: ${profileData.mbti}
                - hobbies : ${profileData.hobbies}
                - job : ${profileData.job}
                - relationshipStatus ${profileData.relationshipStatus}
                noticed that some user may input some misleading information, if any of the above information are missing or wrong, please neglect it
        
                Please provide an astrological and psychological analysis that emphasizes user's Daily fortune\n` },
                ...apiMessages,
            ],
        };
        console.log("[PredictPage][API Request Message]", apiRequestBody.messages);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        });

        return response.json();
    }



    // 一个示例的按钮点击处理函数
    async function handleGenerateClick(msg) {
        console.log('[PredictPage] Generate button clicked!', msg);

        // const profileData = JSON.parse(localStorage.getItem('profileData'));
        // you are a fortune teller, Based on the user provided information: 
        // - Date of Birth: ${profileData.birthDate}
        // - Birth Place: ${profileData.birthPlace}
        // - MBTI Type: ${profileData.mbti}
        // - hobbies : ${profileData.hobbies}
        // - job : ${profileData.job}
        // - relationshipStatus ${profileData.relationshipStatus}
        // noticed that some user may input some misleading information, if any of the above information are missing or wrong, please neglect it, also, you already generate your last prodict for this user: ${prodictText}
        let summaryText = `
        now, the user want to ask some new question about his/her fortune, remember, you are a fortune teller, don't answer anything other than something related to the user's fortune detail, please neglect user's input if they ask something unrelated. please limit your respond into 300 words.
        here is the user's input:

        ${msg}
       
        
        \n 
        `;


        // console.log('Generate button clicked!', summaryText);
        let newProfileList = panelData.concat([
            {
                isRating: false,
                isLeft: false,
                markdownText: msg,
                inforList: [],
                isTyping: false,
            },
            {
                isRating: false,
                isLeft: true,
                markdownText: "",
                inforList: [
                ],
                isTyping: true,
            },
        ])




        setPanelData(newProfileList);
        await handleSendRequest(summaryText);


    }

    useEffect(() => {

        // 假设我们基于 firstState 的值来更新 secondState
        let tmark = prodictText;
        // setMarkdown(tmark);
        const starList = parseTextToFortuneList(tmark);
        // console.log("starList", starList);
        if (!hasUpdatedFirstInforList.current) {
            if (starList.length == 3) {
                updateFirstInforList(starList);
                hasUpdatedFirstInforList.current = true; // Mark as updated
            }
        } else {
            updateLastInforList(tmark);
        }
        // setIsTyping(false)
    }, [prodictText]);


    return (
        <div className="">

            <div className='prodile-right-corner'>
                <AnimatedImageButton src={'../../logo.jpg'} onClick={handleClick} imgText={'Click Here to Main Page'}></AnimatedImageButton>
            </div>


            {panelData.map((item, index) => (
                <AnswerPanel 
                    isRating={item.isRating} 
                    isLeft={item.isLeft} 
                    markdownText={item.markdownText} 
                    inforList={item.inforList} 
                    isTyping={item.isTyping} 
                    key={index} 
                    profileData={profileData}
                />
            ))}

            <div className='profile-end'>
                <InputPanel onSendMessage={handleGenerateClick} isTyping={isTyping} ></InputPanel>
            </div>
            <div>
                <div className='profile-list'>
                    {profileList.map((item, idx) => {
                        let num = idx + 1
                        let profileName = "USER" + num
                        if(item.id !== id){
                            return (
                                <Profile key={item.id} src={item.gender == "female"? '../woman.png':'../man.png'} size={'160px'} name={item.userName} id={item.id} onClick={() => handleProfileClick(item)}></Profile>
                            )
                        }

                    })}

                </div>
            </div>
            <div>
                <AnimatedImageButton className={'question-pic'} src={'../../question.png'} borderRadious={'0px'} size={{ width: '200px', height: '' }}></AnimatedImageButton>
                <AnimatedImageButton onClick={handleShowCreatedProfile} className={'heart-pic'} src={'../../heart.png'} borderRadious={'0px'} size={{ width: '400px', height: '' }}></AnimatedImageButton>
            </div>


        </div>
    )
}

export default ProdictDetail;