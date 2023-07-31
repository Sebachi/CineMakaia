import React, { Children, useState } from 'react'
import "./main.scss"

const SeatInfo = () => {
  const [adulto, setAdulto] = useState(0)
  const [nino, setNino] = useState(0)
  const [grand, setGrand] = useState(0)

  const baseChildren = 30
  const baseAdult = 40
  const baseGrand = 50

  const handleAdult = (seatCount) => {
    if (adulto == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else {
      setAdulto(adulto + seatCount)
    }

  }
  const handleChildren = (seatCount) => {
    if (nino == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else {
      setNino(nino + seatCount)
    }

  }
  const handleGrand = (seatCount) => {
    if (grand == 0 && seatCount < 0) {
      console.log("cantidad negativa invalida")
    } else {
      setGrand(grand + seatCount)
    }

  }

  return (
    <section className='SeatInfo__container'>
      <h3>Selecciona tus boletos</h3>
      <p>Puedes comprar 10 boletos maximos por transaccion</p>
      <article className='SeatInfo__btn'>
        <span>ADULTO</span>
        <div className='SeatInfo__btn__box'>
          <span>${baseAdult * adulto}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleAdult(-1) }}>-</button>
            <span className='SeatInfo__btn__box__in__count'>{adulto}</span>
            <button onClick={() => { handleAdult(+1) }}>+</button>
          </div>
        </div>
      </article>

      <article className='SeatInfo__btn'>
        <span>NIÑO</span>
        <div className='SeatInfo__btn__box'>
          <span>${baseChildren * nino}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleChildren(-1) }}>-</button>
            <span className='SeatInfo__btn__box__in__count'>{nino}</span>
            <button onClick={() => { handleChildren(+1) }}>+</button>
          </div>
        </div>
      </article>

      <article className='SeatInfo__btn'>
        <span>ANCIANO</span>
        <div className='SeatInfo__btn__box'>
          <span>${baseGrand * grand}</span>
          <div className='SeatInfo__btn__box__in'>
            <button onClick={() => { handleGrand(-1) }}>-</button>
            <span className='SeatInfo__btn__box__in__count'>{grand}</span>
            <button onClick={() => { handleGrand(+1) }}>+</button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default SeatInfo