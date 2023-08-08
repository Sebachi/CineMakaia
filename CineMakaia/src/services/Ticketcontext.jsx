import React, { createContext, useState, useEffect } from 'react';
import { get_tickets } from './tickets.js';



const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [movieFunctions, setMovieFunctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const functions = await get_tickets(1);
        setMovieFunctions(functions);
        console.log(functions)
      } catch (error) {
        console.error("Error al obtener las funciones de la pelicula", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TicketContext.Provider value={movieFunctions}>
      {children}
    </TicketContext.Provider>
  );
};

export { TicketContext, TicketProvider };