import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "../assets/styles/reset.scss";

// import Home from "../components/home/main.jsx";
import Home from "../components/home/main.jsx";
import SelectFilm from "../components/selectFilm/main.jsx"
import { AppProvider } from "../services/Appcontex";
import Category from "../components/home/categories/category.jsx"
import BodyHome from "../components/home/body/main";

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route   path="/" element={<BodyHome />} />
          <Route path=":nameCategory" index element={<Category/>}></Route>
          </Route>
       <Route path="/SelectFilm" element={<SelectFilm/>}/> 
        </Routes>
       
      </BrowserRouter>
    </AppProvider>
  );
};

export default Router;
