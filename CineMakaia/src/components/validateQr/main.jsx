import React, { useEffect, useState } from 'react'
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";
import { URL_QR } from '../../services/tickets.js';

const ValidateQr = ({ signIn, login }) => {
  const location = useLocation()
  const functionInfo = location.state[0] //funcion
  const filmInfo = location.state[1] //pelicula
  const ticketInfo = location.state[2] //tiquetes
  const seatId = location.state[3] //id de las sillas
  const serverStatus = location.state[4]; // array a enviar
  const cardData = location.state[5];

  useEffect(() => {
    console.log(location.state)
  }, [])

  return (
    <>
      <Header signIn={signIn} login={login} />
      <main className='validateQr__container'>
        <section className='validateQr__container__box'>

          <article className='validateQr__title'>
            <h3>Boletos</h3>
            <div>
              <p>Fecha: <span>{functionInfo.fecha}</span></p>
              <p>Funcion: <span>{functionInfo.horario}</span></p>
            </div>
          </article>

          <article className='validateQr__film'>
            <figure className='validateQr__film__figure'>
              <img src={`https://image.tmdb.org/t/p/original/${filmInfo.poster_path}`} alt="imagen de cartelera" />
            </figure>
            <div className='validateQr__film__description'>
              <p>Pelicula: <span>{filmInfo.title}</span></p>
              <p>Complejo: <span>{functionInfo.teatro}</span></p>
              <p>Numero de sala: <span>{functionInfo.sala}</span></p>
              <p>Asientos:
                {
                  seatId.map((seat, index) => (
                    <span key={index} >{seat}, </span>
                  ))
                }
              </p>
            </div>
          </article>
          <QRCode value={`${URL_QR}${cardData[0]}`} className='validateQr__qr' />
        </section>
      </main>
    </>
  )
}

export default ValidateQr