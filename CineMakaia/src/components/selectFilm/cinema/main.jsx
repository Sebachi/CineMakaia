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
  const [params, setParams] = useState(1)


  const [cinemaFunctions, setCinemaFunctions] = useState(false);
  const [salasArray, setSalasArray] = useState([]) //dividir funciones por sala

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
    if (params !== dataId) {
      setParams(dataId)
      console.log("params: ", params)
      setShowInfo(showInfo + 1)
      console.log("antes: ", params)
    }
  }, [dataId])


  useGetMovie(dataId, dateFunction2, setCinemaFunctions, staticState);

  useEffect(() => {

    //proceso de validacion de teatro y fecha
    //getServer(params)
    console.log(cinemaFunctions);
    if (cinemaFunctions) {
      let countSalas = []

      let tiqueteria = cinemaFunctions;
      let tiqueteria2 = []
      tiqueteria.forEach((element, index) => {
        if ((element.teatro.includes(cinemaTheater))) {
          tiqueteria2.push(element)
          let newSala = element.sala;
          if (!countSalas.includes(newSala)) {
            countSalas.push(newSala)
          }

        }
      });
      setSalasArray(countSalas)
      //console.log(salasArray)



      if (cinemaFunctions != false) {
        setTicketData(tiqueteria2);
        console.log(tiqueteria2)
        console.log("despues: ", params)
      }

    } else {
      setShowInfo(showInfo + 1)
    }
    //console.log(ticketData)
    //ticketData, cinemaFunctions,
  }, [showInfo]);


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
          <section className='cinema__hall'>
            {
              salasArray.map((salaId, index) => (
                <article key={index}>
                  <p>sala # {salaId}</p>
                  <ul>
                    {ticketData
                      .sort((a, b) => horariosEnMinutos[a.horario] - horariosEnMinutos[b.horario])
                      .map((time) => (time.sala === salaId ?
                        (
                          <li key={time.id} className={time.id == selectedClick.id ? "cinema__btn__activated" : "cinema__btn"} onClick={() => {
                            handleCinema(time)
                          }} >{time.horario}</li>
                        ) : ("")
                      )
                      )
                    }
                  </ul>
                </article>
              ))
            }

          </section>
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