import React from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const TranscriptPayout = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const [validPayout, setValidPayout] = useState(false)

  const functionInfo = location.state[0]
  const filmInfo = location.state[1]
  const ticketInfo = location.state[2]
  const seatId = location.state[3]

  let watchFields = watch(["userEmail", "userName", "userCard", "userExp", "cvv"])
  useEffect(() => {
    console.log(watchFields)
    if (watchFields[0]) {
      console.log("userEmail ", watchFields[0].length)
      console.log("userName ", watchFields[1].length)
      console.log("userCard ", watchFields[2].length)
      console.log("userExp ", watchFields[3].length)
      console.log("cvv ", watchFields[4].length)
      if ((watchFields[1].length > 5) && (watchFields[2].length == 12) && (watchFields[3].length == 4) && (watchFields[0].length == 3)) {
        setValidPayout(true)
      } else {
        setValidPayout(false)
      }
    }
    console.log("pago validado? ", validPayout)

  }, [watch, watchFields])


  const handleContinue = () => {
    console.log(seatId)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      {seatId ? (
        <>
          <Header />
          <aside className='TranscriptPayout__container'>
            <section className='TranscriptPayout__container__form'>
              <h2>Informacion personal</h2>
              <p>Completa los datos del formulario para realizar el pago</p>

              <form onSubmit={handleSubmit(onSubmit)} className='form' >
                <div className='form__box'>
                  <label htmlFor="userEmail">Correo electronico</label>
                  <input type="text"  {...register("userEmail")} defaultValue={0} />
                </div>
                <div className='form__box'>
                  <label htmlFor="userName">Nombre en la targeta</label>
                  <input type="text" {...register("userName")} defaultValue={0} />
                </div>
                <div className='form__box'>
                  <label htmlFor="userCard">Numero de la targeta</label>
                  <input type="number" {...register("userCard")} defaultValue={0} />
                </div>
                <div className='form__box special'>
                  <div className='form__box__double'>
                    <label htmlFor="userExp">Fecha de caducidad</label>
                    <input type="number" {...register("userExp")} defaultValue={0} />
                  </div>
                  <div className='form__box__double'>
                    <label htmlFor="cvv">CVV</label>
                    <input {...register("cvv")} defaultValue={0} />
                  </div>
                </div>
                <button type='submit' value="submit">dale form</button>
              </form>
            </section>

            <section className='TranscriptPayout__container__info'>
              <h3>Resumen de compra</h3>
              <article className='TranscriptPayout__film'>
                <figure className='TranscriptPayout__film__figure'>
                  <img src={`https://image.tmdb.org/t/p/original/${filmInfo.poster_path}`} alt="imagen de cartelera" />
                </figure>
                <div className='TranscriptPayout__film__description'>
                  <p>Pelicula: <span>{filmInfo.title}</span></p>
                  <p>Complejo: <span>{functionInfo.teatro}</span></p>
                  <p>Fecha: <span>{functionInfo.fecha}</span></p>
                  <p>Funcion: <span>{functionInfo.horario}</span></p>
                  <p>Numero de sala: <span>{functionInfo.sala}</span></p>
                  <p>Boletos: <span>{`${ticketInfo.child} niños, ${ticketInfo.adult} adultos y ${ticketInfo.grand} ancianos`}</span></p>
                  <p>Asientos:
                    {
                      seatId.map((seat, index) => (
                        <span key={index} >{seat}, </span>
                      ))
                    }
                  </p>
                </div>
              </article>
              <p className='TranscriptPayout__pretext'>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
              <div className='TranscriptPayout__cost'>
                <span className='TranscriptPayout__cost__info'>Total(IVA incluido):</span>
                <span className='TranscriptPayout__cost__price'>${ticketInfo.price}</span>
              </div>
              {
                validPayout == true ? <p className='TranscriptPayout__continue__activated' onClick={handleContinue} >Continuar</p> : <p className='TranscriptPayout__continue'>Continuar</p>
              }

            </section>
          </aside>
        </>
      ) : (<p>ingreso no valido, comience elo proceso nuevamente</p>)}
    </>
  )
}

export default TranscriptPayout