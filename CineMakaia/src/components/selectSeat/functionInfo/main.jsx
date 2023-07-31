import React, { useContext, useEffect, useState } from 'react'
import "./main.scss"
import { useLocation } from 'react-router-dom'
import { AppContext } from "../../../services/Appcontex.jsx";


const FuncionInfo = () => {
  const first = useContext(AppContext)

  const location = useLocation()
  const functionInfo = location.state;
  const functionContent = functionInfo[0];
  const filmId = functionInfo[1];
  const [filmContent, setFilmContent] = useState(null)


  const [moviesData, setMoviesData] = useState(null);
  const [showCounter, setShowCounter] = useState(0);

  useEffect(() => {

    if (first.length > 0) {
      setMoviesData([[], ...first])
      console.log(moviesData);
    }
    console.log(functionContent)
    console.log(filmId)

    if (moviesData !== null) {
      setFilmContent(moviesData[filmId])
    }
    if (filmContent) {
      console.log(filmContent)
    } else {
      setShowCounter(showCounter + 1)
    }


  }, [first, showCounter]);

  return (
    <>
      {filmContent?.poster_path ? (
        <section className='FuncionInfo__container'>
          <h3>Resumen de compra</h3>
          <article className='FuncionInfo__film'>
            <figure className='FuncionInfo__film__figure'>
              <img src={`https://image.tmdb.org/t/p/original/${filmContent.poster_path}`} alt="imagen de cartelera" />
            </figure>
            <div FuncionInfo__film__description>
              <p>Pelicula <span>{filmContent.title}</span></p>
              <p>Complejo <span>{functionContent.teatro}</span></p>
              <p>Fecha <span>{functionContent.fecha}</span></p>
              <p>Funcion <span>{functionContent.horario}</span></p>
            </div>
          </article>
          <p className='FuncionInfo__pretext'>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
          <div className='FuncionInfo__cost'>
            <span className='FuncionInfo__cost__info'>Total(IVA incluido):</span>
            <span className='FuncionInfo__cost__price'>$250</span>
          </div>
          <p className='FuncionInfo__continue__activated'>Continuar</p>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default FuncionInfo