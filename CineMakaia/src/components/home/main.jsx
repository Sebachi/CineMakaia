//import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx'
import "./main.scss"
import BodyHome from './body/main.jsx';


function  Home() {
  return(
      <>
      <Header/>
      <div className='bodyhome'>
      <BodyHome/></div>
      </>
    )
}

export default Home
