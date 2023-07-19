import React, { useEffect, useState } from "react";
import "./main.scss";
import { getMoviesNowPlaying } from "../../../services/request";
import { formatterDate } from "../../../services/formatterDates";

function Carousel() {
  const [moviesData, setMoviesData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesNowPlaying();
        setMoviesData(data);
      } catch (error) {
        console.error("Error al obtener los datos de la películas", error);
      }
    };
    getData();
  }, []);
  const [a, setA] = useState(0);
  const [b, setB] = useState(5);
  return (
    <>
      {moviesData ? (
        <section className="carousel">
            <div className="carousel_button">
                <figure className="carousel_button_left"><img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
                <figure className="carousel_button_right"><img src="/images/arrow-right.svg" alt="arrow-right" /></figure>
            </div>
          {moviesData.slice(a, b).map((movie, index) => (
            <figure
              className={`carousel_card carousel_card_${index + 1}`}
              key={movie.id}
            >
              <img
                className="carousel_card_img"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="poster"
              />
              <p className="carousel_card_text">
                <span className="carousel_card_text_title">{movie.title}</span>
                <span className="carousel_card_text_subtitle">Estreno</span>
                <span className="carousel_card_text_release"> {formatterDate(movie.release_date)}</span>
                <span className="carousel_card_text_subtitle">Generos</span>
                <span className="carousel_card_text_genres">{movie.genres[0].name}, {movie.genres[1].name}</span>
                <span className="carousel_card_text_runtime"> {movie.runtime} m </span>
              </p>
            </figure>
          ))}
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Carousel;
