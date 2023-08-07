import React, { Children, useEffect, useState } from 'react'
import "./main.scss"
import { useLocation } from 'react-router-dom'

const SeatInfo = ({ childTicket, setChildTicket, adultTicket, setAdultTicket, grandTicket, setGrandTicket, baseChild, baseAdult, baseGrand }) => {

  // const handleTotal = () => {
  //   let totalTicket = (baseChild * childTicket) + (baseAdult * adultTicket) + (baseGrand * grandTicket)
  //   setValue((baseChild * childTicket) + (baseAdult * adultTicket) + (baseGrand * grandTicket))
  //   console.log(`cantidad niños ${childTicket}`)
  //   console.log(`cantidad adultos ${adultTicket}`)
  //   console.log(`cantidad ancianos ${grandTicket}`)
  //   console.log(value)
  // }
  const location = useLocation()
  const functionInfo = location.state;
  const functionContent = functionInfo[0]; //info funcion
  let ocupiedSeat = functionContent.asientos.length;
  let maxSeat = 30;
  let actualSeat = maxSeat - ocupiedSeat
  const [maxBuySeat, setMaxBuySeat] = useState(10);

  useEffect(() => {
    console.log(functionContent)
    console.log(actualSeat)
    if (actualSeat < maxBuySeat) {
      setMaxBuySeat(actualSeat)
    }
  }, [])


  const handleAdult = (seatCount) => {
    if (adultTicket == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else if (((grandTicket + childTicket + adultTicket) == maxBuySeat) && (seatCount > 0)) {
      console.log("limite maximo alcanzado")
    } else {
      setAdultTicket(adultTicket + seatCount)
    }
  }
  const handleChildren = (seatCount) => {
    if (childTicket == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else if (((grandTicket + childTicket + adultTicket) == maxBuySeat) && (seatCount > 0)) {
      console.log("limite maximo alcanzado")
    } else {
      setChildTicket(childTicket + seatCount)
    }
  }
  const handleGrand = (seatCount) => {
    if (grandTicket == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else if (((grandTicket + childTicket + adultTicket) == maxBuySeat) && (seatCount > 0)) {
      console.log("limite maximo alcanzado")
    } else {
      setGrandTicket(grandTicket + seatCount)
    }
  }

  return (
    <section className='SeatInfo__container'>
      <h3>Selecciona tus boletos</h3>
      <p>Puedes comprar 10 boletos maximos por transaccion. Hay actualmente {actualSeat} asientos disponibles para esta función</p>
      <article className='SeatInfo__btn'>
        <span className='SeatInfo__btn__text'>ADULTO</span>
        <div className='SeatInfo__btn__box'>
          <span className='SeatInfo__btn__box__cost'>${baseAdult * adultTicket}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleAdult(-1) }} className='minus'>-</button>
            <span className='SeatInfo__btn__box__in__count'>{adultTicket}</span>
            <button onClick={() => { handleAdult(1) }} className='plus'>+</button>
          </div>
        </div>
      </article>

      <article className='SeatInfo__btn'>
        <span className='SeatInfo__btn__text'>NIÑO</span>
        <div className='SeatInfo__btn__box'>
          <span className='SeatInfo__btn__box__cost'>${baseChild * childTicket}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleChildren(-1) }} className='minus'>-</button>
            <span className='SeatInfo__btn__box__in__count'>{childTicket}</span>
            <button onClick={() => { handleChildren(+1) }} className='plus'>+</button>
          </div>
        </div>
      </article>

      <article className='SeatInfo__btn'>
        <span className='SeatInfo__btn__text'>ANCIANO</span>
        <div className='SeatInfo__btn__box'>
          <span className='SeatInfo__btn__box__cost'>${baseGrand * grandTicket}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleGrand(-1) }} className='minus'>-</button>
            <span className='SeatInfo__btn__box__in__count'>{grandTicket}</span>
            <button onClick={() => { handleGrand(+1) }} className='plus'>+</button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default SeatInfo