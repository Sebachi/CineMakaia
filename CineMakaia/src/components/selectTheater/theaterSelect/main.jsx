import React, { useEffect, useState } from 'react'
import "./main.scss"
import chairAvailable from "../../../assets/chair-disponible.svg"
import chairSelected from "../../../assets/chair-seleccion.svg"
import chairOcupied from "../../../assets/chair-ocupado.svg"

import { useLocation, useNavigate } from 'react-router-dom'
import { get_tickets2 } from '../../../services/tickets.js'

const SelectSeatTheater = ({ actualSeat, setActualSeat, seatId, setSeatId, seatArray, setSeatArray }) => {
  //para recibir y dar informacion
  const navigate = useNavigate()
  const location = useLocation()
  //almacenar dicha informacion
  const functionId = location.state[0].id

  let newArray = []

  const maxSeat = location.state[2].adult + location.state[2].child + location.state[2].grand;
  const [showContainer, setShowContainer] = useState(0)
  const [showContainer2, setShowContainer2] = useState(0)
  const [showContainer3, setShowContainer3] = useState(0)
  const [seatStatus, setSeatStatus] = useState([])
  const seatPerFunction = 30;

  const getServer = async (id) => {
    let server = await get_tickets2(id)
    ////console.log(server)
    if (server[1] == 200) {
      setSeatArray(server[0].asientos)
      setShowContainer3(1)
      //console.log("lista de sillas")
      //console.log(seatArray)
    } else {
      setShowContainer(showContainer + 1)
    }
  }

  // useEffect(() => {
  //   //recibir la info de los asientos
  //   //console.log(functionId)
  //   if (seatArray.length == 0) {
  //     getServer(functionId)
  //     setShowContainer(showContainer + 1)
  //   }
  //   //console.log("lista de sillas")
  //   //console.log(seatArray)
  // }, [showContainer])

  useEffect(() => {
    //recibir la info de los asientos
    //console.log(functionId)
    getServer(functionId)
  }, [showContainer])

  // useEffect(() => {
  //   //darle color a los asientos
  //   if ((seatArray.length > 0) && (seatStatus.length == 0)) {
  //     for (let j = 0; j < seatArray.length; j++) {
  //       if (seatArray[j].status == "false") {
  //         let newObject = {
  //           id: j + 1,
  //           status: "available"
  //         }
  //         newArray.push(newObject)
  //       }
  //       else {
  //         let newObject = {
  //           id: j + 1,
  //           status: "ocupied"
  //         }
  //         newArray.push(newObject)
  //       }
  //     }
  //     setSeatStatus(newArray)
  //     //console.log("se actualizo")
  //   }
  //   if (seatStatus.length == 0) {
  //     setShowContainer2(showContainer2 + 1)
  //   }
  // }, [showContainer2])

  useEffect(() => {
    //darle color a los asientos
    if ((showContainer3 > 0) && (seatStatus.length == 0)) {

      for (let j = 1; j < seatPerFunction + 1; j++) {
        let getSeat1 = seatArray.find((infoSeat) => infoSeat.id === j) || { id: 99 }
        if (getSeat1.id !== 99) {
          newArray.push(getSeat1)
        } else {
          let getSeat2 = {
            id: j,
            status: "available"
          }
          newArray.push(getSeat2)
        }
      }

      setSeatStatus(newArray)
      //console.log("se actualizo")
      //console.log(newArray)
    }
    if (seatStatus.length == 0) {
      setShowContainer2(showContainer2 + 1)
    } else {
      ////console.log(seatStatus)
    }
  }, [showContainer2])

  const handleSeatAvailable = (ind) => {
    //console.log(`clickeaste en la silla azul #${ind + 1}`)
    //console.log(maxSeat)
    //console.log(actualSeat)
    if (actualSeat < maxSeat) {
      // const editList = seatStatus.map(item => item.id === id ? item.status : "selected")
      // setSeatStatus(editList)
      //opcion 2
      const editList = seatStatus;
      editList[ind].status = "selected"
      setSeatStatus(editList)

      const editList2 = seatId;
      const editList3 = seatStatus[ind].id
      editList2.push(editList3)
      setSeatId(editList2)

      //console.log("estado de las sillas")
      //console.log(seatStatus)
      setShowContainer3(showContainer3 + 1)
      setActualSeat(actualSeat + 1)
    } else {
      //console.log("limite maximo alcanzado")
    }

  }
  const handleSeatSelected = (ind) => {
    //console.log(`clickeaste en la silla naranja #${ind + 1}`)
    const editList = seatStatus;
    editList[ind].status = "available"
    setSeatStatus(editList)

    const editList2 = seatId;
    const editList3 = editList2.filter((item) => item != seatStatus[ind].id)
    setSeatId(editList3)

    //console.log("estado de las sillas")
    //console.log(seatStatus)
    setShowContainer3(showContainer3 + 1)
    setActualSeat(actualSeat - 1)
  }



  return (
    <>
      {seatStatus.length > 10 ? (
        <section className='SelectSeat__container'>
          <h3>Selecciona tus asientos</h3>
          <p>Para cambiar tu lugar asignado da click en el asiento deseado</p>
          <figure className='SelectSeat__template'>
            <div className='SelectSeat__template__container'><img src={chairSelected} alt="Seleccion" />
              <span>Seleccion</span></div>
            <div className='SelectSeat__template__container'><img src={chairOcupied} alt="Ocupado" />
              <span>Ocupado</span></div>
            <div className='SelectSeat__template__container'><img src={chairAvailable} alt="Disponible" />
              <span>Disponible</span></div>
          </figure>
          <div className='SelectSeat__hr'></div>
          <article className='SelectSeat__seat'>
            {seatStatus.map((seat, index) => (
              <div key={index} className='SelectSeat__seat__box'>
                {seat.status == "occupied" ?
                  (<figure className='SelectSeat__seat__box__fig__img'>
                    <img src={chairOcupied} alt='asiento ocupado' className='SelectSeat__seat__box__fig__img' />
                    <p className='SelectSeat__seat__box__fig__span'>{seat.id}</p>
                  </figure>)
                  :
                  (seatStatus[index].status == "available" ?
                    (<figure className='SelectSeat__seat__box__fig__img' onClick={() => { handleSeatAvailable(index) }} >
                      <img src={chairAvailable} alt='asiento' className='SelectSeat__seat__box__fig__img' />
                      <p className='SelectSeat__seat__box__fig__span'>{seat.id}</p>
                    </figure>)
                    :
                    (<figure className='SelectSeat__seat__box__fig__img' onClick={() => { handleSeatSelected(index) }}>
                      <img src={chairSelected} alt='asiento' className='SelectSeat__seat__box__fig__img' />
                      <p className='SelectSeat__seat__box__fig__span'>{seat.id}</p>
                    </figure>)

                  )
                }

              </div>
            ))
            }
          </article>
        </section >
      ) : (<p>cagando...</p>)}
    </>

  )
}

export default SelectSeatTheater