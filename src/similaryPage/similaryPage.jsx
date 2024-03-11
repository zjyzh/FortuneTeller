import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './similaryPage.css'
import AnimatedImageButton from '../mainPage/imgBut';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useNavigate } from 'react-router-dom';
import Profile from './profile';
import InputPanel from '../prodictPage/inputPanel';
import AnswerPanel from '../prodictPage/answerPanel';
// import Avaitor from './avaitor';
import { useEffect, useState } from 'react';


// clickedList = clickedList ? clickedList : "[]"


const SecondPage = () => {
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
    
    const [isTyping, setIsTyping] = useState(false);

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
            console.log("new data last", last)
            console.log("before new data", oldPanelData)
            // 更新第一个元素的inforList
            oldPanelData[last] = {
                ...oldPanelData[last],
                markdownText: markdownData,
                isTyping: false
            };
            console.log("after new panel data", oldPanelData)
            return [...oldPanelData]
        });
        // console.log("[...newData]", [...panelData]);
    };

    let profileList = JSON.parse(localStorage.getItem('profileList') || "[]")
    let idList = localStorage.getItem('clickedprofileList')
    // console.log(idList)
    let showedProfileList = []
    for(let i = 0 ; i < profileList.length ; i++){
        if(idList.indexOf(profileList[i]['id']) !== -1){
            showedProfileList.push(profileList[i])
        }
    }
    // console.log(showedProfileList)


    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    

    const handleCreateProfile = () => {
        navigate('/profile-page');
    };


    const handleProfileClick = (id) => {
        navigate('/detail-page', { state: { id } });
    };

    const handleGenerateClick = ()=>{
        alert('click')
    }


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
                            <Profile key={item.id} src={item.gender == "female"? '../woman.png':'../man.png'} size={'140px'} name={item.userName} id={item.id} ></Profile>
                        )
                    })}

                </div>
            </div>
            <div>


                {panelData.map((item, index) => (
                    <AnswerPanel isRating={item.isRating} isLeft={item.isLeft} markdownText={item.markdownText} inforList={item.inforList} isTyping={item.isTyping} key={index} />
                ))}
                <div className='profile-end'>
                    <InputPanel onSendMessage={handleGenerateClick} isTyping={isTyping} ></InputPanel>
                </div>
            </div>
        </div>
    )
}

export default SecondPage;