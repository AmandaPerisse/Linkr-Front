import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    
    <BrowserRouter>
      <UserContext.Provider>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
