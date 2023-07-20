import React from "react";
import "./main.scss";

function TopNav() {
  return (
    <section className="topNav">
      <div className="topNav_logo">
        <figure className="topNav_logo_figure">
          <img src="/icon-makaia.png" alt="icon_makaia" />
        </figure>
        <strong className="topNav_logo_text">CineMakaia</strong>
      </div>
      <div className="topNav_categories">
        <p className="topNav_categories_button">Accion</p>
        <p className="topNav_categories_button">Terror</p>
        <p className="topNav_categories_button">Ciencia Ficcion</p>
        <p className="topNav_categories_button">Comedia</p>
      </div>
      <div className="topNav_UI">
        <div className="topNav_UI_function">
          <div className="topNav_UI_function_cinemas">
          <label for="cinemas">Cines cercanos</label>{" "}
          <select name="cinemas" id="cinemas">
            <option value="Los Molinos">Los Molinos</option>
            <option value="el tesoro">El Tesoro</option>
          </select></div>
          <div className="topNav_UI_function_dates">
          <label for="fDates">Fecha</label>{" "}
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
