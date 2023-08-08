import React from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation, useNavigate } from 'react-router-dom';

import circleCheck from "../../assets/circle-check.svg"
import cardVisa from "../../assets/visa-classic.svg"
import cardMaster from "../../assets/mastercard.svg"
import cardNI from "../../assets/cheque-payment.svg"

const ValidatePayout = ({ signIn, login }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const functionInfo = location.state[0] //funcion
  const filmInfo = location.state[1] //pelicula
  const ticketInfo = location.state[2] //tiquetes
  const seatId = location.state[3] //id de las sillas
  const serverStatus = location.state[4]; // array a enviar
  const cardData = location.state[5];

  const [actualDate, setActualDate] = useState("")

  useEffect(() => {
    console.log(location.state)
  }, [])

  const handleContinue = () => {
    navigate(`qr`, { state: [functionInfo, filmInfo, ticketInfo, seatId, serverStatus, cardData] })
  }

  return (
    <>
      <Header signIn={signIn} login={login} />
      <aside className='ValidatePayout__container'>
        <figure className='ValidatePayout__container__status'>
          <img src={circleCheck} alt="bien" />
          <p>¡Transacción exitosa!</p>

        </figure>
        <section className='ValidatePayout__container__card'>
          <div className='card__title'>
            <h2>Informacion de compra</h2>
            <span>Facturacion</span>
          </div>
          <article className='card__box'>
            <div className='card__box__inside'>
              <p>Codigo</p>
              <span>#{cardData[0]}</span>
            </div>
            <div className='card__box__inside'>
              <p>Fecha</p>
              <span>{functionInfo.fecha}</span>
            </div>
            <div className='card__box__inside'>
              <p>Total</p>
              <span>${ticketInfo.price}</span>
            </div>
            <div className='card__box__inside special'>
              <p>Metodo de pago</p>
              {cardData[1] == "Visa" ? (<img src={cardVisa} alt="visa" />) : (cardData[1] == "Master Card" ? (<img src={cardMaster} alt="Master card" />) : (<img src={cardNI} alt="imagen de tarjeta" />))}
              <span>{cardData[1]} - **** {cardData[2]}</span>
            </div>
          </article>
        </section>
        <section className='ValidatePayout__container__info'>
          <h3>Resumen de compra</h3>
          <article className='ValidatePayout__film'>
            <figure className='ValidatePayout__film__figure'>
              <img src={`https://image.tmdb.org/t/p/original/${filmInfo.poster_path}`} alt="imagen de cartelera" />
            </figure>
            <div className='ValidatePayout__film__description'>
              <p>Pelicula: <span>{filmInfo.title}</span></p>
              <p>Complejo: <span>{functionInfo.teatro}</span></p>
              <p>Fecha: <span>{functionInfo.fecha}</span></p>
              <p>Funcion: <span>{functionInfo.horario}</span></p>
              <p>Numero de sala: <span>{functionInfo.sala}</span></p>
              <p>Boletos: <span>
                {/* {`${ticketInfo.child} niños, ${ticketInfo.adult} adultos y ${ticketInfo.grand} ancianos`} */}
                {ticketInfo.child > 1 ? (`${ticketInfo.child} niños`) : (ticketInfo.child > 0 ? (`${ticketInfo.child} niño`) : (""))} {ticketInfo.adult > 1 ? (` ${ticketInfo.adult} adultos`) : (ticketInfo.adult > 0 ? (` ${ticketInfo.adult} adulto`) : (""))}
                {ticketInfo.grand > 1 ? (` ${ticketInfo.grand} ancianos`) : (ticketInfo.grand > 0 ? (` ${ticketInfo.grand} anciano`) : (""))}
              </span></p>
              <p>Asientos:
                {
                  seatId.map((seat, index) => (
                    <span key={index} >{seat}, </span>
                  ))
                }
              </p>
            </div>
          </article>

          <p className='ValidatePayout__continue__activated' onClick={handleContinue} >Descargar boletos</p>
        </section>

      </aside>

    </>
  )
}

export default ValidatePayout