import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserContext from "./Providers/UserContext";

function App() {

  return (

    <BrowserRouter>
      <UserContext.Provider>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
