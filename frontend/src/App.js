import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Home from "./views/Home/Home";
import UserInfo from "./views/UserInfo/UserInfo";
import Cuisine from "./views/Cuisine/Cuisine";
import Searched from "./views/Searched/Searched";
import Recipe from "./views/Recipe/Recipe";
import Ingredients from './views/Ingredients/SearchedIng';
import { AnimatePresence } from "framer-motion";

function App() {
  const user = localStorage.getItem("token");
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {user && <Route path="/" exact element={<Home />}/>}
            <Route path="/" element={<Navigate to="/login" />} />
            {user && <Route path="/home" exact element={<Home />}/>}
            <Route exact path="/home" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {user && <Route path="/userinfo" exact element={<UserInfo />}/>}
            <Route path="/userinfo" element={<Navigate replace to="/login" />} />
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/searched+ingredient/:ingredient" element={<Ingredients />} />
            <Route path="/recipe/:id" element={<Recipe />} />
          </Routes>
        </AnimatePresence>
  );
}

export default App;
