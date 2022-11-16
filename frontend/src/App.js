import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Home from "./views/Home/Home";
import UserInfo from "./views/UserInfo/UserInfo";

function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {user && <Route path="/home" exact element={<Home />}/>}
          <Route exact path="/home" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user && <Route path="/userinfo" exact element={<UserInfo />}/>}
          <Route path="/userinfo" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
