import React, { useEffect, useState } from 'react'
import "./main.scss"
import chairAvailable from "../../../assets/chair-disponible.svg"
import chairSelected from "../../../assets/chair-seleccion.svg"
import chairOcupied from "../../../assets/chair-ocupado.svg"

const SelectSeat = () => {
  const TotalSeat = 30;
  const [seatArray, setSeatArray] = useState([])
  const [showContainer, setShowContainer] = useState(0)
  useEffect(() => {
    let newArray = [];
    for (let index = 0; index < TotalSeat; index++) {
      newArray.push(index)
    }
    setSeatArray(newArray)
    console.log(seatArray)
    if (seatArray.length == 0) {
      setShowContainer(showContainer + 1)

    }
  }, [showContainer])


  return (
    <>
      {seatArray[1] ? (
        <section className='SelectSeat__container'>
          <h3>Selecciona tus asientos</h3>
          <p>Para cambiar tu lugar asignado da click en el asiento deseado</p>
          <figure className='SelectSeat__template'>
            <img src={chairSelected} alt="Seleccion" />
            <span>Seleccion</span>
            <img src={chairOcupied} alt="Ocupado" />
            <span>Ocupado</span>
            <img src={chairAvailable} alt="Disponible" />
            <span>Disponible</span>
          </figure>
          <div className='SelectSeat__hr'></div>
          <article className='SelectSeat__seat'>
            {seatArray.map((seat, index) => (
              <div key={index} className='SelectSeat__seat__box selected'>
                <img src={chairAvailable} alt='asiento' className='SelectSeat__seat__box__img' />
                <p className='SelectSeat__seat__box__span'>{index + 1}</p>
              </div>
            ))
            }
          </article>
        </section >
      ) : (<p>cagando...</p>)}
    </>
  )
}

export default SelectSeat