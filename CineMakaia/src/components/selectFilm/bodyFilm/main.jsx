import React, { useContext, useEffect, useState } from "react";
import { formatterDate } from "../../../services/formatterDates";
import "./main.scss";
import { AppContext } from "../../../services/Appcontex";
import { get_movie } from "../../../services/request";
import { useLocation } from "react-router-dom";
import { get_trailer } from "../../../services/getTrailer";

const FilmInfo = () => {
  const location = useLocation()
  const [moviesData, setMoviesData] = useState(null);
  const first = useContext(AppContext)
  //const [dataId, setDataId] = useState(1)
  let dataId = location.state;
  const [repeatCont, setRepeatCont] = useState(0)
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    if (first.length > 0) {
      setMoviesData([[], ...first])
      //console.log(moviesData);
    }
    if (moviesData != null) {
      console.log(moviesData[dataId])
    }

  }, [first]);

  useEffect(() => {
    const getMovieInf = async () => {
      try {
        const trailerUrl = await get_trailer(moviesData[dataId].id);
        setTrailer(trailerUrl);
      } catch (error) {
        console.error("Error al obtener los datos de la película", error);
        setRepeatCont(repeatCont + 1)
      }
    };
    getMovieInf();
  }, [first, dataId, repeatCont]);

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
            <iframe
              id="youtube-player"
              className="movieEditor_top_trailer_iframe"
              src={trailer}
              title="youtube-player"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </section>
          <section className="film__container__description">
            <h4>Sinopsis</h4>
            <p>{moviesData[dataId].overview}</p>
          </section>
        </main >
      ) : (
        <p>Loading...</p>
      )}
    </>
  );

}

export default FilmInfo;