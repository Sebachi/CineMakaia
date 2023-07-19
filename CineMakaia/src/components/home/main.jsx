import { useEffect, useState } from 'react'
import { get_movie } from '../../services/request';


function  Home() {
const [movieData, setMovieData] = useState(null);
useEffect(() => {
  get_movie(667538)
  .then(data => {
    setMovieData(data);
  })
  .catch(error => {
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
          <figure><img src='' alt="" /></figure>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Home
