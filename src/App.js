import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserContext from "./Providers/UserContext";
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const [userInfos, setUserInfos] = useState('');

  return (

    <UserContext.Provider value={{ userInfos, setUserInfos }} >
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
