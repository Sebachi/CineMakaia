import React, { useEffect, useState } from "react";
import "./main.scss";
import useForm from "../../../hooks/useForm";
import { getUser } from "../../../services/usersServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function FormLogin({ onClose, signIn, login }) {
  const [dataForm, handleChange, resetForm] = useForm();
  const [adminInf, setAdminInf] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    login && setAdminInf(JSON.parse(localStorage.getItem("UserInf")));
  }, [login]);

  const resetUserInf = (e) => {
    e.preventDefault();
    signIn(false);
    localStorage.setItem("UserInf", JSON.stringify({}));
  };
  const handleAdminPanel = () => {
    navigate(`/adminPanel`)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedUser = await getUser(dataForm);
    if (loggedUser) {
      Swal.fire(
        `Excelente ${loggedUser.name}`,
        "Has iniciado sesion con exito!",
        `success`
      ).then(signIn(true), localStorage.setItem("UserInf", JSON.stringify(loggedUser)), handleAdminPanel(), onClose() );
    } else {
      Swal.fire(`Ups`, "Usuario no encontrado", `error`);
    }
    console.log(loggedUser);
    resetForm();
  };
  return (
    <>
      {login ? (
        <section className="login">
          <article className="login_content">
            <span className="login_close" onClick={onClose}>
              &times;
            </span>
            <h2 className="login_title">Bienvenido</h2>
            <h2 className="login_label">{adminInf.name}</h2>
            <h3 className="login_subtitle2">¿Qué deseas hacer?</h3>
            <div className="login_form_button" onClick={handleAdminPanel}>
              Panel de control
            </div>
            <button className="login_form_button" onClick={resetUserInf}>
              Cerrar sesión
            </button>
          </article>
        </section>
      ) : (
        <section className="login" id="loginForm">
          <article className="login_content">
            <div className="login_close" onClick={onClose}>
              &times;
            </div>
            <h2 className="login_title">Bienvenido</h2>
            <h3 className="login_subtitle">Iniciar Sesión</h3>
            <form className="login_form" onSubmit={handleSubmit}>
              <label className="login_form_label">Correo electrónico</label>
              <input
                className="login_form_input"
                onChange={handleChange}
                type="text"
                value={dataForm?.email || ""}
                placeholder="example.email@gmail.com"
                name="email"
              />
              <label className="login_form_label">Contraseña</label>
              <input
                className="login_form_input"
                onChange={handleChange}
                name="password"
                value={dataForm?.password || ""}
                placeholder="Ingresa tu contraseña"
                type="password"
              />
              <button className="login_form_submit" type="submit">
                Iniciar sesión
              </button>
            </form>
          </article>
        </section>
      )}
    </>
  );
}

export default FormLogin;
