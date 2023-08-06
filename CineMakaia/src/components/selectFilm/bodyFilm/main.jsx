import React, { useContext, useEffect, useState } from "react";
import { formatterDate } from "../../../services/formatterDates";
import "./main.scss";
import { AppContext } from "../../../services/Appcontex";
import { get_movie } from "../../../services/request";
import { useLocation } from "react-router-dom";

const FilmInfo = () => {
  const location = useLocation()
  const [moviesData, setMoviesData] = useState(null);
  const first = useContext(AppContext)
  const dataId = location.state;
  useEffect(() => {
    if (first.length > 0) {
      setMoviesData([[], ...first])
      //console.log(moviesData);
    }
    if (moviesData != null) {
      console.log(moviesData[dataId])
    }

  }, [first]);

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
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hebWYacbdvc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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