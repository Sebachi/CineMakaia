import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "../components/home/main.jsx";

const Router = () => {
const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
