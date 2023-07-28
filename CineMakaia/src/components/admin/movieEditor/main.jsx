import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopNav from '../../header/nav/main';
import "./main.scss"
import { get_movieOmdb } from '../../../services/requestOmdb';
import { ratedReader } from '../../../services/ratedReading';
import { get_trailer } from '../../../services/getTrailer';


function MovieEditor({signIn, login}) {
    const location = useLocation()
    const movie = location.state
    //console.log(location.state);
    const [movieOmdb, setMovieOmdb] = useState(null);
    const [trailer, setTrailer] = useState(null);
    console.log(movie);
    useEffect(() => {
      const getMovieInf = async () => {
        try {
          const movieInf = await get_movieOmdb(movie.imdb_id);
         const trailerUrl = await get_trailer(movie.id)
          setMovieOmdb(movieInf);
         setTrailer(trailerUrl);
        } catch (error) {
          console.error("Error al obtener los datos de la película", error);
        }
      };
      getMovieInf();
    }, []);


  return (
    <>
   
    <div className="background_admin"></div>
    <div className='topNav_admin'>
    <TopNav signIn={signIn} login={login} isAdmin={true}/>
    </div>
    {
        movieOmdb  ?
       
        <section>

        <div>
            {ratedReader(movieOmdb?.Rated)}
        </div>

         <section>
         <h3>Trailer</h3>
         <iframe
           src={trailer}
           title={movie.title}
           frameBorder="0"
           allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           allowFullScreen
         ></iframe>
       </section>
       </section>
        : <div>Loading ...</div>
    }



    </>
  )
}

export default MovieEditor