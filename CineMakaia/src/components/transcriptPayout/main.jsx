import React from 'react'
import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { patch_tickets2, post_qr } from '../../services/tickets.js';

const TranscriptPayout = ({ signIn, login }) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const [validPayout, setValidPayout] = useState(false)

  const functionInfo = location.state[0] //funcion
  const filmInfo = location.state[1] //pelicula
  const ticketInfo = location.state[2] //tiquetes
  const seatId = location.state[3] //id de las sillas
  const serverArray = location.state[4]; // array a enviar


  const [ramdomN, setRamdomN] = useState(0)
  const [sendStatus, setSendStatus] = useState("")
  let cardFirstDigit = 0;
  let cardLastDigit = "";
  let cardType = "";

  const [patchArray, setPatchArray] = useState([])


  let watchFields = watch(["userEmail", "userName", "userCard", "userExp", "cvv"])
  useEffect(() => {
    console.log(watchFields)
    if (watchFields[0]) {
      console.log("userEmail ", watchFields[0].length)
      console.log("userName ", watchFields[1].length)
      console.log("userCard ", watchFields[2].length)
      console.log("userExp ", watchFields[3].length)
      console.log("cvv ", watchFields[4].length)
      if ((watchFields[1].length > 5) && (watchFields[2].length == 16) && (watchFields[3].length == 7) && (watchFields[4].length == 3)) {
        setValidPayout(true)
        cardFirstDigit = Number(watchFields[2].charAt(0));
        cardLastDigit = watchFields[2].slice(-4)

        if (cardFirstDigit == 4) {
          cardType = "Visa"
        } else if (cardFirstDigit == 5) {
          cardType = "Master Card"
        } else {
          cardType = "Metodo no identificado"
        }

      } else {
        setValidPayout(false)
      }
    }
    console.log("pago validado? ", validPayout)

  }, [watch, watchFields])

  useEffect(() => {
    console.log(location.state)
    let newNumber = Math.trunc(Math.random() * 100000000);
    setRamdomN(newNumber)
    console.log(ramdomN)
  }, [])

  //para crear el nuevo array a hacer patch
  useEffect(() => {
    let newArray1 = []
    let newArray2 = []
    serverArray.map((element) => newArray1.push(element.id))
    seatId.map((element) => newArray1.push(element))
    newArray1.sort((a, b) => a - b)
    console.log("array post sort y pre objeto")
    console.log(newArray1)
    newArray1.map((element) => newArray2.push(
      {
        id: element,
        status: "ocupied"
      }
    ))
    console.log("array post arreglo a objeto")
    console.log(newArray2)
    setPatchArray(newArray2)

  }, [])


  const patchServer = async (id, obj) => {
    let status = await patch_tickets2(id, obj)
    setSendStatus(status)
  }

  const postVoucher = async (voucher) => {
    await post_qr(voucher)
  }

  const handleContinue = () => {
    const newkey = {
      "asientos": patchArray
    }

    let qr = {
      "id": ramdomN,
      "pelicula": filmInfo.title,
      "funcion": functionInfo.id,
      "teatro": functionInfo.teatro,
      "sala": functionInfo.sala,
      "fecha": functionInfo.fecha,
      "hora": functionInfo.horario,
      "asientos": seatId
    }
    patchServer(functionInfo.id, newkey);
    postVoucher(qr);
    let payoutInfo = [ramdomN, cardType, cardLastDigit];
    navigate(`validate`, { state: [functionInfo, filmInfo, ticketInfo, seatId, sendStatus, payoutInfo] })

  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      {seatId ? (
        <>
          <Header signIn={signIn} login={login} />
          <aside className='TranscriptPayout__container'>
            <section className='TranscriptPayout__container__form'>
              <h2>Informacion personal</h2>
              <p>Completa los datos del formulario para realizar el pago</p>

              <form onSubmit={handleSubmit(onSubmit)} className='form' >
                <div className='form__box'>
                  <label htmlFor="userEmail">Correo electronico</label>
                  <input type="text" placeholder='ingrese su correo electronico' {...register("userEmail")} />
                </div>
                <div className='form__box'>
                  <label htmlFor="userName">Nombre en la targeta</label>
                  <input type="text" placeholder='ingrese nombre en la targeta' {...register("userName")} />
                </div>
                <div className='form__box'>
                  <label htmlFor="userCard">Numero de la targeta</label>
                  <input type="number" placeholder='1234 1234 1234 1234' {...register("userCard")} />
                </div>
                <div className='form__box special'>
                  <div className='form__box__double'>
                    <label htmlFor="userExp">Fecha de caducidad</label>
                    <input type="month" min="2023-08" {...register("userExp")} />
                  </div>
                  <div className='form__box__double'>
                    <label htmlFor="cvv">CVV</label>
                    <input type='number' placeholder='Enter CVV' {...register("cvv")} />
                  </div>
                </div>
                {/* <button type='submit' value="submit">dale form</button> */}
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
                  <p>Boletos: <span>
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