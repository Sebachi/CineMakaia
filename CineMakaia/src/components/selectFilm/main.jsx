import { useEffect, useState } from 'react';
import Header from '../header/main.jsx'
import "./main.scss"
import CinemaInfo from './cinema/main.jsx';
import FilmInfo from './bodyFilm/main.jsx';


function SelectFilm() {

  return (
    <>
      <Header />
      <div className='bodyfilm'>
        <FilmInfo />
        <CinemaInfo />
      </div>
    </>
  )
}

export default SelectFilm;