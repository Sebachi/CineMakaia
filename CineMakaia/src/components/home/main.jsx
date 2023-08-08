//import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx'
import "./main.scss"
import BodyHome from './body/main.jsx';
import { Outlet, useParams } from 'react-router-dom';
import FormLogin from '../Login/forms/main.jsx';


function  Home({signIn, login}) {
  return(
      <>
      <Header isHome={true} signIn={signIn} login={login}/>
     
      <Outlet/>
      </>
    )
}

export default Home
