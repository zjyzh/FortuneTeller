import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import AnimatedImageButton from './mainPage/imgBut';
import MainPage from './mainPage/main.jsx'; // 导入你的主页组件
import SecondPage from './secondMainPage/secondPage.jsx'
// import AnotherPage from './AnotherPage'; // 导入你想跳转到的页面组件
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ProfilePage from './profilePage/mainProfile.jsx';
import { ProfileProvider } from './context/profileContext.jsx';
import ProdictDetail from './prodictPage/prodictDetail.jsx';
import SimilaryPage from './similaryPage/similaryPage.jsx';
import SecondProfilePage from './secondProfilePage/secondProfile.jsx';
import AvatarProfilePage from './avatarProfilePage/avatarProfile.jsx';


const App = () => {


  // const [mealType, setMealType] = useState('');
  // const [allergies, setAllergies] = useState({
  //   nuts: false,
  //   dairy: false,
  //   seafood: false,
  //   gluten: false,
  // });
  // const [budgetRange, setBudgetRange] = useState([20, 50]);
  // const [selectedFlavor, setSelectedFlavor] = useState('salty'); // 设置默认口味为 'spicy'
  // const [intensity, setIntensity] = useState(30); // 设置默认强度为 30
  // const [preferences, setPreferences] = useState({
  //   fruits: false,
  //   vegetables: false,
  //   meats: false,
  //   seafood: false,
  //   legumes: false,
  //   vegetarian: false,
  //   vegan: false,
  //   glutenFree: false,
  //   lactoseFree: false,
  //   nutFree: false,
  //   halal: false,
  //   kosher: false,
  // });
  // const [customPreference, setCustomPreference] = useState('');

  // const [summary, setSummary] = useState('');






  return (
    <div className="App">

      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/second-page" element={<SecondPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/detail-page" element={<ProdictDetail />} />
            <Route path="/similary-page" element={<SimilaryPage />}></Route>
            <Route path="/second-profile-page" element={<SecondProfilePage />} /> 
            <Route path="/avatar-profile-page" element={<AvatarProfilePage />} /> 

          </Routes>
        </Router>
      </ProfileProvider>



    </div>
  )
}

export default App;