import React, { useContext, useEffect, useState } from "react";
import "./main.scss";
import { get_tickets } from '../../../services/tickets.js';
import { TicketContext } from '../../../services/Ticketcontext.jsx';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetMovie } from "../../../hooks/useGetMovies";

const CinemaInfo = () => {
  const [ticketData, setTicketData] = useState([]);
  const [cinemaTheater, setCinemaTheater] = useState("");
  const [cinemaDate, setCinemaDate] = useState(false);
  const [staticState, setStaticState] = useState(false);
  const location = useLocation()
  const dataId = location.state;
  const [params, setParams] = useState(false)


  const [cinemaFunctions, setCinemaFunctions] = useState(false);

  // const getServer = async (id) => {
  //   let server = await get_tickets(id)
  //   setCinemaFunctions(server)
  // }
  const [showInfo, setShowInfo] = useState(0);
  const [selectedClick, setSelectedClick] = useState({})
  const navigate = useNavigate()
  let dateFunction2 = localStorage.getItem("dateFunction")

  const horariosEnMinutos = {
    "10:00 AM": 600,
    "11:00 AM": 660,
    "12:00 PM": 720,
    "1:00 PM": 780,
    "2:00 PM": 840,
    "3:00 PM": 900,
    "4:00 PM": 960,
    "5:00 PM": 1020,
    "6:00 PM": 1080,
    "7:00 PM": 1140,
    "8:00 PM": 1200,
    "9:00 PM": 1260
  };


  useEffect(() => {
    let cinemaName = JSON.parse(localStorage.cinemaSelected);
    let dateFunction = localStorage.getItem("dateFunction")
    setCinemaTheater(cinemaName)
    setCinemaDate(dateFunction)
    setParams(dataId)
  

  }, [location, dataId])


  useGetMovie(dataId, dateFunction2, setCinemaFunctions, staticState);

  useEffect(() => {

    //proceso de validacion de teatro y fecha
    //getServer(params)
    console.log(cinemaFunctions);
    if (cinemaFunctions) {

      let tiqueteria = cinemaFunctions;
      console.log(tiqueteria);
      let tiqueteria2 = []
      tiqueteria.forEach((element, index) => {
        if ((element.teatro.includes(cinemaTheater))) {
          tiqueteria2.push(element)
        }
      });
      setShowInfo(showInfo + 1)
      if (showInfo < 20) {
        setTicketData(tiqueteria2);
      }
    }
    //console.log(ticketData)

  }, [cinemaTheater, cinemaDate, ticketData, params, cinemaFunctions]);


  const handleCinema = (obj) => {
    setSelectedClick(obj)
  }
  const handleContinue = () => {
    navigate(`seat`, { state: [selectedClick, dataId] })
  }


  return (
    <>
      {ticketData ? (
        <aside className='cinema__container'>
          <h3 className='cinema__date' >Horarios disponibles {cinemaDate}</h3>
          <p className='cinema__text'>Elije el horario que prefieras.</p>
          <h4 className='cinema__theater'>{cinemaTheater}</h4>
          <ul>
            {
              ticketData
              .sort((a, b) => horariosEnMinutos[a.horario] - horariosEnMinutos[b.horario])
              .map((time) => (
                <li key={time.id} className={time.id == selectedClick.id ? "cinema__btn__activated" : "cinema__btn"} onClick={() => {
                  handleCinema(time)
                }} >{time.horario}</li>
              ))
            }

          </ul>
          {
            selectedClick?.horario ? <p className="cinema__continue__activated" onClick={handleContinue} >Seleccionar boletos</p> : <p className="cinema__continue">Seleccionar boletos</p>
          }
        </aside >
      ) : (
        <p>no se encontraron funciones para esta pelicula con los criterios de teatro y fecha seleccionados</p>
      )}
    </>
  );
}

export default CinemaInfo;