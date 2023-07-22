import React, { useContext, useEffect, useState } from "react";
import "./main.scss";
import { get_tickets } from '../../../services/tickets';
import { TicketContext } from '../../../services/Ticketcontext.jsx';


const CinemaInfo = () => {
  const [ticketData, setTicketData] = useState(null);
  const first = useContext(TicketContext)
  const dataId = 1;
  useEffect(() => {

    if (first !== null) { setTicketData(first) }

  }, [first]);


  return (
    <>
      {ticketData ? (
        <aside className='cinema__container'>
          <h4>cinema features available</h4>
          <p>choose a feature</p>
          {/* {
          film.map((item, index) => (<div key={index + 1} ><p>{item.horario}</p></div>))
        } */}
        </aside>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CinemaInfo;