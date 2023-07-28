import React, { useEffect, useState } from "react";
import "./main.scss";
import { useNavigate, useParams } from "react-router-dom";
import FormLogin from "../../Login/forms/main";
import BasicDatePicker from "../../pickers/datepicker/main.jsx";
import SelectCinema from "../../pickers/selectCinema/main.jsx";

function TopNav({isHome, signIn, login, isAdmin}) {
  const navigate = useNavigate()
 const currentCategory = useParams()
 const [showLogin, setShowLogin] = useState(false);
 const [adminInf, setAdminInf] = useState({});
 useEffect(() => {
  login && setAdminInf(JSON.parse(localStorage.getItem("UserInf")));
}, [login]);



 const handleFigureClick = () => {
   setShowLogin(true);
 };
 const handleLoginClose = () => {
  setShowLogin(false);
};
  const handleClick = (category) => {
    currentCategory.nameCategory !== category ?
    navigate(`${category}`, { state: category })
    :  navigate(`/`)
  }
  const handleHome = () =>{
    navigate(`/`)
  }
 const category2 = currentCategory.nameCategory
const handleActiveCategory = (category) => {
  return category2 === category ? "activeCategory" : "";
}

  return (
    <section className="topNav">
      <div className="topNav_logo" onClick={handleHome}>
        <figure className="topNav_logo_figure">
          <img src="/icon-makaia.png" alt="icon_makaia" />
        </figure>
        <strong className="topNav_logo_text">CineMakaia</strong>
      </div>
      { isHome &&
      <div className="topNav_categories">
        <p className={`topNav_categories_button ${handleActiveCategory("Action")}`} onClick={()=> handleClick("Action")}>Accion</p>
        <p className={`topNav_categories_button ${handleActiveCategory("Comedy")}`} onClick={()=> handleClick("Comedy")}>Comedia</p>
        <p className={`topNav_categories_button ${handleActiveCategory("Drama")}`} onClick={()=> handleClick("Drama")}>Drama</p>
        <p className={`topNav_categories_button ${handleActiveCategory("Adventure")}`} onClick={()=> handleClick("Adventure")}>Aventura</p>
      </div>
     }
      <div className="topNav_UI">
      { isHome &&
        <div className="topNav_UI_function">
          <div className="topNav_UI_function_cinemas">
          <label htmlFor="cinemas">Cines cercanos</label>
          <SelectCinema/>
          </div>
          <div className="topNav_UI_function_dates">
          <label >Fecha</label>
          <BasicDatePicker className="topNav_UI_function_dates_picker"/>
          </div>
        </div>
        }
        <div className="topNav_UI_user">
          <figure className="topNav_UI_user_figure" onClick={handleFigureClick}>
            <img src={login ? adminInf.image : "/images/user-default.svg"} alt="user-icon" />
          </figure>
          {isAdmin && <div className="topNav_UI_user_inf"><p className="topNav_UI_user_inf_name"> {adminInf.name} </p> <p className="topNav_UI_user_inf_des">View profile</p></div> }
          {showLogin && <FormLogin onClose={handleLoginClose} signIn={signIn} login={login}/>}
        </div>
      </div>
    </section>
  );
}

export default TopNav;
