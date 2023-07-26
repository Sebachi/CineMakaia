import React, { useState } from 'react'
import "./main.scss"
function FormLogin({ onClose }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  
  
  
  
    return (
    <>
    <div className="login" id="loginForm">
     <div className="login_content">
      <span className="login_close" onClick={onClose}>&times;</span>
      <h2 className='login_title'>Bienvenido</h2>
      <h3 className='login_subtitle'>Iniciar Sesión</h3>
      <form className='login_form' >
        <label className='login_form_label'>Correo electrónico</label>
        <input className='login_form_input' type="text"   placeholder='example.email@gmail.com' name='email'/>
        <label className='login_form_label'>Contraseña</label>
        <input  className='login_form_input'  name='password' placeholder='Ingresa tu contraseña' type="password" />
        <div className='login_form_submit' type="submit">Iniciar sesión</div>
      </form>
      </div>
     </div>
    </>
  )
}

export default FormLogin