import React, { useContext, useEffect, useState } from "react";
import "./main.scss";
import { AppContext } from "../../../services/Appcontex";
import { get_movie } from "../../../services/request";
import { useLocation, useParams } from "react-router-dom";
import { get_trailer } from "../../../services/getTrailer";

const FilmInfo = () => {
  const location = useLocation();
  const [moviesData, setMoviesData] = useState(null);
  const first = useContext(AppContext);
  let dataId = location.state;
  const [trailer, setTrailer] = useState(null);
  const [trailerLoaded, setTrailerLoaded] = useState(false);
  
  const [idMovie, setIdMovie] = useState(useParams())


  // MOVIE TMDB INF
  useEffect(() => {
    const getMovieInf = async () => {
      if (first.length > 0) {
        setMoviesData([[], ...first]);
      }
    };
    getMovieInf();
  }, [first]);

  //TRAILER
  useEffect(() => {
    const getTrailer = async () => {
      if (moviesData && dataId !== null) {
        try {
          const trailerURL = await get_trailer(moviesData[dataId].id);
          setTrailer(trailerURL);
          setTrailerLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getTrailer();
  }, [dataId, moviesData, idMovie.selectFilm]);


















  
  return (
    <>
      {moviesData ? (
        <main className="film__container">
          <section className="film__container__info">
            <figure>
              <img src={`https://image.tmdb.org/t/p/original/${moviesData[dataId].poster_path}`} alt="cartelera" />
            </figure>
            <article >
              <h3>{moviesData[dataId].title}</h3>
              <p>{moviesData[dataId].title}: {moviesData[dataId].tagline} ({moviesData[dataId].release_date})</p>
              <div>
                <p className="info__time">{moviesData[dataId].runtime} min</p>
                {moviesData[dataId].genres.map(
                  (element, index) => (
                    <p className="info__genres" key={index}> {element.name}</p>

                  )
                )}
              </div>
            </article>
          </section>
          <section className="film__container__trailer">
            <h4>Trailer</h4>
            {trailerLoaded ? (
              <iframe
                id="youtube-player"
                className="movieEditor_top_trailer_iframe"
                src={trailer}
                title="youtube-player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Loading trailer...</p>
            )}
          </section>
          <section className="film__container__description">
            {/* ... (your existing code) */}
          </section>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );

}

export default FilmInfo;