import { useEffect, useState } from 'react'
import './App.css'
import { get_movie } from './services/request'

function App() {
const [movieData, setMovieData] = useState(null);
useEffect(() => {
  get_movie(667538)
  .then(data => {
    // Cuando la Promesa se resuelva, actualizamos el estado con los datos de la película
    setMovieData(data);
  })
  .catch(error => {
    // Manejo de errores si ocurriera algún problema con la solicitud
    console.error('Error al obtener los datos de la película:', error);
  });
}, [])

  return (
    <>
     <h1>Movie Details</h1>
      {movieData ? (
        <div>
          <h2>{movieData.title}</h2>
          <p>{movieData.overview}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
