import React, { useContext, useEffect, useState } from "react";
import "./main.scss";
import { get_tickets } from '../../../services/tickets.js';
import { TicketContext } from '../../../services/Ticketcontext.jsx';
import { useLocation } from "react-router-dom";

const CinemaInfo = () => {
  const [ticketData, setTicketData] = useState([]);

  const [cinemaTheater, setCinemaTheater] = useState("");
  const [cinemaDate, setCinemaDate] = useState("");

  const location = useLocation()
  const dataId = location.state;

  const [cinemaFunctions, setCinemaFunctions] = useState([]);

  const getServer = async (id) => {
    let server = await get_tickets(id)
    setCinemaFunctions(server)
  }

  const [showInfo, setShowInfo] = useState(0);
  const [selectedClick, setSelectedClick] = useState({ id: 99 })
  useEffect(() => {
    //proceso de validacion de teatro y fecha
    let cinemaName = localStorage.cinemaSelected;
    let dateFunction = localStorage.getItem("dateFunction")

    setCinemaTheater(cinemaName)
    console.log(cinemaTheater)
    setCinemaDate(dateFunction)
    console.log(cinemaDate)

    //proceso de validacion de pelicula
    console.log(dataId);
    getServer(dataId)
    console.log("lista de funciones")
    console.log(cinemaFunctions)

    let tiqueteria = cinemaFunctions;
    console.log(tiqueteria.length)
    let tiqueteria2 = []

    tiqueteria.forEach((element, index) => {
      if (cinemaName.includes(element.teatro)) {
        tiqueteria2.push(element)
      }
    });

    setShowInfo(showInfo + 1)
    if (showInfo < 50) {
      setTicketData(tiqueteria2);
    }
    console.log(ticketData)

  }, [cinemaTheater, dataId, cinemaDate, ticketData]);

  const handleCinema = (obj) => {
    setSelectedClick(obj)
    console.log(selectedClick)
  }

  return (
    <>

      {ticketData ? (
        <aside className='cinema__container'>
          <h3 className='cinema__date' >Horarios disponibles {cinemaDate}</h3>
          <p className='cinema__text'>Elije el horario que prefieres</p>
          <h4 className='cinema__theater'>{cinemaTheater}</h4>
          <ul>
            {
              ticketData.map((time) => (
                <li key={time.id} className={time.id == selectedClick.id ? "cinema__btn__activated" : "cinema__btn"} onClick={() => {
                  handleCinema(time)
                }} >{time.horario}</li>
              ))
            }

          </ul>
          {
            selectedClick?.horario ? <p className="cinema__continue__activated">Seleccionar boletos</p> : <p className="cinema__continue">Seleccionar boletos2</p>
          }
        </aside >
      ) : (
        <p>no se encontraron funciones para esta pelicula con los criterios de teatro y fecha seleccionados</p>
      )}
    </>
  );
}

export default CinemaInfo;