import React from "react";
import "./main.scss";
import { useNavigate, useParams } from "react-router-dom";

function TopNav({isHome}) {
  const navigate = useNavigate()
  const handleClick = (category) => {
    navigate(`${category}`, { state: category })
  }
  return (
    <section className="topNav">
      <div className="topNav_logo">
        <figure className="topNav_logo_figure">
          <img src="/icon-makaia.png" alt="icon_makaia" />
        </figure>
        <strong className="topNav_logo_text">CineMakaia</strong>
      </div>
      { isHome &&
      <div className="topNav_categories">
        <p className="topNav_categories_button" onClick={()=> handleClick("Action")}>Accion</p>
        <p className="topNav_categories_button" onClick={()=> handleClick("Comedy")}>Comedia</p>
        <p className="topNav_categories_button" onClick={()=> handleClick("Drama")}>Drama</p>
        <p className="topNav_categories_button" onClick={()=> handleClick("Adventure")}>Aventura</p>
      </div>
     }
      <div className="topNav_UI">
        <div className="topNav_UI_function">
          <div className="topNav_UI_function_cinemas">
          <label htmlFor="cinemas">Cines cercanos</label>{" "}
          <select name="cinemas" id="cinemas">
            <option value="Los Molinos">Los Molinos</option>
            <option value="el tesoro">El Tesoro</option>
          </select></div>
          <div className="topNav_UI_function_dates">
          <label htmlFor="fDates">Fecha</label>{" "}
          <select name="fDates" id="fDates">
            <option value="Los Molinos">20/7/2023</option>
            <option value="el tesoro">21/7/2023</option>
          </select>
          </div>
        </div>
        <div className="topNav_UI_user">
          <figure className="topNav_UI_user_figure">
            <img src="/images/user-default.svg" alt="user-icon" />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default TopNav;
