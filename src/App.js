import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TimelinePage from './pages/TimelinePage';
import UserContext from "./Providers/UserContext";
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const [userInfos, setUserInfos] = useState('');
    console.log(userInfos);

  return (

    <UserContext.Provider value={{ userInfos, setUserInfos }} >
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/timeline" element={<TimelinePage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
