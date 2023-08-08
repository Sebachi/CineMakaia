import React, { createContext, useState, useEffect } from 'react';
import { getMoviesNowPlaying } from './request';


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await getMoviesNowPlaying();
        setNowPlayingMovies(movies);
      } catch (error) {
        console.error("Error al obtener los datos de las películas", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={nowPlayingMovies}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };