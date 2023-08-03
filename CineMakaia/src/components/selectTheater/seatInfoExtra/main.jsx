import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./main.scss"

const SeatInfoExtra = () => {
  //para recibir y dar informacion
  const navigate = useNavigate()
  const location = useLocation()
  //almacenar dicha informacion
  const functionInfo = location.state[0]
  const filmInfo = location.state[1]
  const ticketInfo = location.state[2]

  const [validAccess, setValidAccess] = useState(false)

  useEffect(() => {
    if ((location.state).length > 2) {
      //console.log(location.state)
      setValidAccess(true)
    }
  }, [])


  return (
    <>
      {validAccess ? (
        <section className='SeatInfoExtra__container'>
          <h3>Resumen de compra</h3>
          <article className='SeatInfoExtra__film'>
            <figure className='SeatInfoExtra__film__figure'>
              <img src={`https://image.tmdb.org/t/p/original/${filmInfo.poster_path}`} alt="imagen de cartelera" />
            </figure>
            <div className='SeatInfoExtra__film__description'>
              <p>Pelicula <span>{filmInfo.title}</span></p>
              <p>Complejo <span>{functionInfo.teatro}</span></p>
              <p>Fecha <span>{functionInfo.fecha}</span></p>
              <p>Funcion <span>{functionInfo.horario}</span></p>
              <p>Numero de sala <span>{functionInfo.sala}</span></p>
              <p>Boletos <span>{`${ticketInfo.child} niños, ${ticketInfo.adult} adultos y ${ticketInfo.grand} ancianos`}</span></p>
              <p>Asientos <span>{ticketInfo.child + ticketInfo.adult + ticketInfo.grand}</span></p>
            </div>
          </article>
          <p className='SeatInfoExtra__pretext'>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
          <div className='SeatInfoExtra__cost'>
            <span className='SeatInfoExtra__cost__info'>Total(IVA incluido):</span>
            <span className='SeatInfoExtra__cost__price'>${ticketInfo.price}</span>
          </div>
          <p className='SeatInfoExtra__continue'>Continuar</p>
          {/* {
        totalTicketPrice ? <p className='SeatInfoExtra__continue__activated' onClick={handleContinue} >Continuar</p> : <p className='SeatInfoExtra__continue'>Continuar</p>
      } */}

        </section>
      ) : (<p>debe acceder desde una pelicula...</p>)}
    </>
  )
}

export default SeatInfoExtra