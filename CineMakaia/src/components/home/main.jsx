//import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx'
import "./main.scss"
import BodyHome from './body/main.jsx';
import { Outlet, useParams } from 'react-router-dom';


function  Home() {
  return(
      <>
      <Header isHome={true}/>
      <Outlet/>
      </>
    )
}

export default Home
