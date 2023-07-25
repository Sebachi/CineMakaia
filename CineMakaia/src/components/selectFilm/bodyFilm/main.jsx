import React, { useContext, useEffect, useState } from "react";
import { formatterDate } from "../../../services/formatterDates";
import "./main.scss";
import { AppContext } from "../../../services/Appcontex";
import { get_movie } from "../../../services/request";

const FilmInfo = () => {
  const [moviesData, setMoviesData] = useState(null);
  const first = useContext(AppContext)
  const dataId = 1;
  useEffect(() => {
    if (first.length > 0) {
      console.log("leyendo array");
      setMoviesData([...first, first[0], first[1], first[2], first[3]])
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
                <p className="info__genres">{moviesData[dataId].genres[0].name}</p>
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