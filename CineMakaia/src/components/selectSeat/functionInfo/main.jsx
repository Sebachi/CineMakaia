import React, { useContext, useEffect, useState } from 'react'
import "./main.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from "../../../services/Appcontex.jsx";


const FuncionInfo = ({ totalTicketPrice, totalTicketAmount, childTicket, adultTicket, grandTicket }) => {
  const first = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const functionInfo = location.state;
  const functionContent = functionInfo[0]; //info funcion
  const filmId = functionInfo[1]; //id de la pelicula
  const [filmContent, setFilmContent] = useState(null) //info de la pelicula
  const [ticketInfo, setTicketInfo] = useState({})


  const [moviesData, setMoviesData] = useState(null);
  const [showCounter, setShowCounter] = useState(0);

  //validacion de pelicula
  useEffect(() => {
    //console.log(functionContent)

    if (first.length > 0) {
      setMoviesData([[], ...first])
      ////console.log("info context")
      ////console.log(moviesData);
    }
    ////console.log("informacion funcion e Id")
    ////console.log(functionContent)
    ////console.log(filmId)

    if (moviesData !== null) {
      setFilmContent(moviesData[filmId])
      ////console.log(filmContent)
    } else {
      setShowCounter(showCounter + 1)
    }
  }, [first, showCounter]);

  useEffect(() => {
    setTicketInfo({
      child: childTicket,
      adult: adultTicket,
      grand: grandTicket,
      price: totalTicketPrice
    }
    )
  }, [totalTicketAmount])

  const handleContinue = () => {
    navigate(`theater`, { state: [functionContent, filmContent, ticketInfo] })
  }

  return (
    <>
      {filmContent?.poster_path ? (
        <section className='FuncionInfo__container'>
          <h3>Resumen de compra</h3>
          <article className='FuncionInfo__film'>
            <figure className='FuncionInfo__film__figure'>
              <img src={`https://image.tmdb.org/t/p/original/${filmContent.poster_path}`} alt="imagen de cartelera" />
            </figure>
            <div className='FuncionInfo__film__description'>
              <p>Pelicula: <span>{filmContent.title}</span></p>
              <p>Complejo: <span>{functionContent.teatro}</span></p>
              <p>Fecha: <span>{functionContent.fecha}</span></p>
              <p>Funcion: <span>{functionContent.horario}</span></p>
            </div>
          </article>
          <p className='FuncionInfo__pretext'>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
          <div className='FuncionInfo__cost'>
            <span className='FuncionInfo__cost__info'>Total(IVA incluido):</span>
            <span className='FuncionInfo__cost__price'>${totalTicketPrice}</span>
          </div>
          {
            totalTicketPrice ? <p className='FuncionInfo__continue__activated' onClick={handleContinue} >Continuar</p> : <p className='FuncionInfo__continue'>Continuar</p>
          }

        </section>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}

export default FuncionInfo