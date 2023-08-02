import React, { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "../assets/styles/reset.scss";
import Home from "../components/home/main.jsx";
import SelectFilm from "../components/selectFilm/main.jsx"
import { AppProvider } from "../services/Appcontex";
import Category from "../components/home/categories/category.jsx"
import BodyHome from "../components/home/body/main";
import PrivateRouter from "./privateRouter";
import AdminHome from "../components/admin/adminHome/main";
import MovieEditor from "../components/admin/movieEditor/main";
import SelectSeat from "../components/selectSeat/main.jsx";
import SelectTheater from "../components/selectTheater/main.jsx";

const Router = () => {
  const storedAuthentication = JSON.parse(localStorage.getItem("IsLogin")) || false;
  const [isLogin, setIsLogin] = useState(storedAuthentication);






  useEffect(() => {
    localStorage.setItem("IsLogin", isLogin)
  }, [isLogin])

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home signIn={setIsLogin} login={isLogin} />}>
            <Route path="/" element={<BodyHome />} />
            <Route path=":nameCategory" index element={<Category />}></Route>
          </Route>
          <Route path="/SelectFilm/:selectFilm" element={<SelectFilm signIn={setIsLogin} login={isLogin} />} />
          <Route path="/SelectFilm/:selectFilm/seat" element={<SelectSeat signIn={setIsLogin} login={isLogin} />} />
          <Route path="/SelectFilm/:selectFilm/seat/theater" element={<SelectTheater signIn={setIsLogin} login={isLogin} />} />
          <Route element={<PrivateRouter isAutenticate={isLogin} />}>
            <Route path="/adminPanel" element={<AdminHome signIn={setIsLogin} login={isLogin} />} />
            <Route path="/adminPanel/:movieEdit" element={<MovieEditor signIn={setIsLogin} login={isLogin} />}   ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default Router;
