import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../assets/styles/reset.scss"

// import Home from "../components/home/main.jsx";
import Home from "../components/home/main.jsx";

const Router = () => {
const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
