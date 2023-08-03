import React, { useEffect, useState } from 'react'
import "./main.scss"
import chairAvailable from "../../../assets/chair-disponible.svg"
import chairSelected from "../../../assets/chair-seleccion.svg"
import chairOcupied from "../../../assets/chair-ocupado.svg"

import { useLocation, useNavigate } from 'react-router-dom'
import { get_tickets2 } from '../../../services/tickets.js'

const SelectSeat = () => {
  const TotalSeat = 30;
  const [seatArray, setSeatArray] = useState([])
  const [showContainer, setShowContainer] = useState(0)
  const [showContainer2, setShowContainer2] = useState(0)
  const [showContainer3, setShowContainer3] = useState(0)
  const [seatStatus, setSeatStatus] = useState([])

  let newArray = []

  //para recibir y dar informacion
  const navigate = useNavigate()
  const location = useLocation()
  //almacenar dicha informacion
  const functionId = location.state[0].id

  const getServer = async (id) => {
    let server = await get_tickets2(id)
    setSeatArray(server.asientos)
  }

  useEffect(() => {
    //recibir la info de los asientos
    console.log(functionId)
    if (seatArray.length == 0) {
      getServer(functionId)
      setShowContainer(showContainer + 1)

      console.log("lista de sillas")
      console.log(seatArray)
    }

  }, [showContainer])

  useEffect(() => {
    //darle color a lso asientos
    if ((seatArray.length > 0) && (seatStatus.length == 0)) {
      for (let j = 0; j < seatArray.length; j++) {
        if (seatArray[j].status == "false") {
          let newObject = {
            id: j + 1,
            status: "available"
          }
          newArray.push(newObject)
        }
        else {
          let newObject = {
            id: j + 1,
            status: "ocupied"
          }
          newArray.push(newObject)
        }
      }
      setSeatStatus(newArray)
      console.log("se actualizo")
    }
    if (seatStatus.length == 0) {
      setShowContainer2(showContainer2 + 1)
    }
  }, [showContainer2])

  const handleSeatAvailable = (id) => {
    console.log(`clickeaste en la silla azul #${id + 1}`)
    // const editList = seatStatus.map(item => item.id === id ? item.status : "selected")
    // setSeatStatus(editList)
    //opcion 2
    const editList = seatStatus;
    editList[id].status = "selected"
    setSeatStatus(editList)
    // console.log("lista de las sillas")
    // console.log(seatArray)
    console.log("estado de las sillas")
    console.log(seatStatus)
    setShowContainer3(showContainer3 + 1)
  }
  const handleSeatSelected = (id) => {
    console.log(`clickeaste en la silla naranja #${id + 1}`)

    // const editList = seatStatus.map(item => item.id === id ? item.status : "available")
    // setSeatStatus(editList)
    const editList = seatStatus;
    editList[id].status = "available"
    setSeatStatus(editList)
    // console.log("lista de las sillas")
    // console.log(seatArray)
    console.log("estado de las sillas")
    console.log(seatStatus)
    setShowContainer3(showContainer3 + 1)
  }



  return (
    <>
      {seatStatus.length > 10 ? (
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
              <div key={index} className='SelectSeat__seat__box'>
                {seat.status == "false" ?
                  (seatStatus[index].status == "available" ?
                    (<img src={chairAvailable} alt='asiento' className='SelectSeat__seat__box__img' onClick={() => { handleSeatAvailable(index) }} />)
                    :
                    (<img src={chairSelected} alt='asiento' className='SelectSeat__seat__box__img' onClick={() => { handleSeatSelected(index) }} />)

                  ) :
                  (<img src={chairOcupied} alt='asiento ocupado' className='SelectSeat__seat__box__img' />)
                }


                <p className='SelectSeat__seat__box__span'>{seat.id}</p>
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