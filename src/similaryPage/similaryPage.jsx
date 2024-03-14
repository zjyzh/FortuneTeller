
import './similaryPage.css'
import AnimatedImageButton from '../mainPage/imgBut';
import { useNavigate } from 'react-router-dom';
// import RatingBox from './ratingBox';

import RatingPanel from '../prodictPage/ratingPanel';
import InputPanel from '../prodictPage/inputPanel';
import AnswerPanel from '../prodictPage/answerPanel';
import { ProfileContext } from '../context/profileContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { render } from 'react-dom';
import Profile from '../prodictPage/detailMiniProfile';


const API_KEY = "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"



const SimilaryPage = () => {

    // console.log(localStorage.getItem('clickedprofileList'))
    const location = useLocation();
    const { id } = "123456"


    const [prodictText, setProdictText] = useState("");

    // function parseTextToFortuneList(text) {
    //     //console.log("origin-text",text)
    //     const sections = text.split('\n\n');
    //     const fortunesList = [];

    //     try {
    //         for (let i = 0; i < sections.length - 1; i++) {
    //             // 先读取前两个
    //             if (i == 0 || i == 1) {
    //                 fortunesList.push({
    //                     text: sections[i],
    //                     // starNum: starNum,
    //                     des: "",
    //                 });
    //             } else { //读取第三个长一点的
    //                 fortunesList.push({
    //                     text: sections[i],
    //                     // starNum: starNum,
    //                     des: sections[i + 1],
    //                 });
    //             }
    //         }
    //         // sections.forEach((section) => {
    //         //     const parts = section.split('\n');
    //         //     if (parts.length > 2) {
    //         //         const [titlePart, ...descriptionParts] = parts;
    //         //         const title = titlePart.trim();
    //         //         //const starNum = parseInt(titlePart.match(/(\d+)/)[0], 10);
    //         //         const description = descriptionParts.join(' ').slice(12).trim(); // Adjusted to slice from 'Description: '

    //         //         fortunesList.push({
    //         //             text: title,
    //         //            // starNum: starNum,
    //         //             des: description,
    //         //         });
    //         //     }else{
    //         //         const [titlePart, ...descriptionParts] = parts;
    //         //         const title = titlePart.trim();
    //         //         fortunesList.push({
    //         //             text: title,
    //         //            // starNum: starNum,
    //         //             des: "",
    //         //         });
    //         //     }
    //         // });
    //     } catch (error) {
    //         console.error("Error processing message:", error);
    //         return [];
    //     } finally {
    //         // setIsTyping(false);
    //     }


    //     return fortunesList;
    // }



    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    const [profileList, setprofileList] = useState([])
    const [profileData, setProfileData] = useState({});
    const [showedProfileList, setShowedProfileList] = useState([])

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) { // Access .current to get its current value
            initialized.current = true; // Correctly set the value through .current

            let summaryText = `
            You are an advanced chatbot designed specifically for a horoscope application. Your task is to provide users with fortunes of the two in three key areas: Match Percent,Best Relationship, Reasons.
            
            your answer should follow this format:
            Match Percent : x ( provide a number from 0 to 100, represent the degree to which the two match )
            
            Best Relationship : several words ( provide the best relationship between the two )
            
            Reasons : some words ( Provide the reasons )
            Description: (Provide a reason about above result, limit your result into 100 words)
            `;

            let profilelist = (JSON.parse(localStorage.getItem('profileList')));
            let idList = localStorage.getItem('clickedprofileList')
            // console.log(idList)
            let showedProfile = []
            for (let i = 0; i < profilelist.length; i++) {
                if (idList.indexOf(profilelist[i]['id']) !== -1) {
                    showedProfile.push(profilelist[i])
                }
            }


            console.log("showedProfileList:::::::::", showedProfile)
            setShowedProfileList(showedProfile)

            //console.log("percen",showedProfileList)
            let tprofileData = profilelist.filter(element => element.id === id);
            setProfileData(tprofileData);

            handleSendRequest(summaryText, showedProfile);

        }
    }, []); // 空依赖数组意味着这个副作用只在组件挂载时运行一次

    const [panelData, setPanelData] = useState([
        {
            isRating: false,
            isLeft: true,
            markdownText: "",
            inforList: [
                { text: "Daily", length: 3, des: "Description of item 1" },
                { text: "Career", length: 2, des: "Description of item 2" },
                { text: "Love", length: 5, des: "Description of item 3" }
            ],
            isTyping: true,
            isDialogue: true, // 标识是不是对话
        },

    ]);

    // 组件其它部分...




    // const updateFirstInforList = (newInforList) => {
    //     // 创建panelData的副本
    //     setPanelData(oldPanelData => {
    //         const newData = [...oldPanelData];
    //         newData[0] = {
    //             ...newData[0],
    //             inforList: newInforList,
    //             isTyping: false,
    //         };
    //         return newData;
    //     });


    //     // console.log("panelData", panelData);
    // };

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
            console.log("update last panel data", oldPanelData)
            // console.log("[PredictPage] after new panel data", oldPanelData)
            return [...oldPanelData]
        });
        // console.log("[...newData]", [...panelData]);
    };





    const [messages, setMessages] = useState([

    ]);

    const [markdown, setMarkdown] = useState("welcome!");

    const [isTyping, setIsTyping] = useState(true);
    const [progress, setProgress] = useState(0);

    // useEffect(() => {

    // const hasUpdatedFirstInforList = useRef(false); // Add this ref

    // }, [isTyping]);
    // const handleShowCreatedProfile = async () => {
    //     let profileList = JSON.parse(localStorage.getItem('profileList'));
    //     profileList = profileList ? profileList : [];
    //     //alert(profileList)
    //     setprofileList(profileList)

    //     let newProfileList = panelData.concat([
    //         {
    //             isRating: false,
    //             isLeft: false,
    //             markdownText: msg,
    //             inforList: [],
    //             isTyping: false,
    //             isDialogue: false,
    //         },
    //     ])

    //     setPanelData(newProfileList);

    // }

    const handleSendRequest = async (message, showedProfileList) => { // Pass showedProfileList as an argument
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user",
        };


        setMessages((prevMessages) => [...prevMessages, newMessage]);

        console.log("[similarpage][SendRequest]", [...messages, newMessage]);

        try {
            const response = await processMessageToChatGPT([...messages, newMessage], showedProfileList); // Pass showedProfileList here
            const content = response.choices[0]?.message?.content;
            if (content) {
                const chatGPTResponse = {
                    message: content,
                    sender: "ChatGPT",
                };
                setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
                updateLastInforList(content);
                setIsTyping(false);
            }
            console.log("[similarpage][ReplyContent]", content);
        } catch (error) {
            console.error("[similarpage][ReplyContent] Error processing message:", error);
        } finally {
            setIsTyping(false);
        }
    };


    async function processMessageToChatGPT(chatMessages, showedProfileList) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role, content: messageObject.message };
        });

        console.log("apiMessages     sss", apiMessages)



        console.log("prcpcess", showedProfileList[0])

        const apiRequestBody = {
            "model": "gpt-4-turbo-preview",
            "messages": [
                {
                    role: "system", content: `you are a fortune teller, Based on the user provided information: 
                - Date of Birth: ${showedProfileList[0].birthDate + '&' + showedProfileList[1].birthDate}
                - Birth Place: ${showedProfileList[0].birthPlace + '&' + showedProfileList[1].birthPlace}
                - MBTI Type: ${showedProfileList[0].mbti + '&' + showedProfileList[1].mbti}
                - hobbies : ${showedProfileList[0].hobbies + '&' + showedProfileList[1].hobbies}
                - job : ${showedProfileList[0].job + '&' + showedProfileList[1].job}
                noticed that some user may input some misleading information, if any of the above information are missing or wrong, please neglect it
                The information of two people is separated by '&'.
                Please provide an astrological and psychological analysis that emphasizes the match percent, best relationship and relevant reasons 
                of the two focusing on the information given\n` },
                ...apiMessages,
            ]
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
        now, the user want to ask some new question about his/her fortune, please limit your respond into 300 words.
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
                isDialogue: true

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
        await handleSendRequest(summaryText, showedProfileList);


    }

    // useEffect(() => {

    //     // 假设我们基于 firstState 的值来更新 secondState
    //     let tmark = prodictText;
    //     console.log("we have prodict text update", tmark);
    //     updateLastInforList(tmark);
    //     // setMarkdown(tmark);
    //     // const starList = parseTextToFortuneList(tmark);
    //     // console.log("starList", starList);
    //     // if (!hasUpdatedFirstInforList) {
    //     //     console.log("we have prodict hasUpdatedFirstInforList", tmark);
    //     //     // if (starList.length == 3) {
    //     //     updateFirstInforList(starList);
    //     //     hasUpdatedFirstInforList = true; // Mark as updated
    //     //     console.log("we have prodict starList", starList);
    //     //     // }
    //     // } else {
    //     //     console.log("we dont have starList", tmark);
    //     //     updateLastInforList(tmark);
    //     // }
    //     // setIsTyping(false)
    // }, [prodictText]);


    return (
        <div className="second-container">

            <div className='second-header'>
                <AnimatedImageButton src={"../logo.jpg"} alt="描述性文本" onClick={handleClick} imgText={""} />
                <h1 className='second-title'>Here is your result!</h1>
            </div>
            <div>
                <div className='profile-list-similary'>
                    {
                        showedProfileList.map((item, idx) => {
                            let num = idx + 1
                            let profileName = "USER" + num
                            return (
                                <Profile key={item.id} src={item.gender == "female" ? '../woman.png' : '../man.png'} size={'140px'} name={item.userName} id={item.id} ></Profile>
                            )
                        })}

                </div>
            </div>
            <div>


                {panelData.map((item, index) => (
                    <AnswerPanel isRating={item.isRating} isLeft={item.isLeft} markdownText={item.markdownText} inforList={item.inforList} isTyping={item.isTyping} key={index} profileData={showedProfileList[0]} />
                ))}
                <div className='profile-end'>
                    <InputPanel onSendMessage={handleGenerateClick} isTyping={isTyping} ></InputPanel>
                </div>
            </div>
        </div>
    )
}

export default SimilaryPage;