import React, { useEffect, useState } from "react";
import "./main.scss";
import { getMoviesNowPlaying } from "../../../services/request";
import { formatterDate } from "../../../services/formatterDates";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function Carousel() {
  const [moviesData, setMoviesData] = useState(null);
  const [a, setA] = useState(0);

  const nextMovie = () => {
    if (a < 9) {
      setA((prevA) => prevA + 1);
    } else {
      setA(0);
    }
  };

  const previusMovie = () => {
    if (a > 3) {
      setA((prevA) => prevA - 1);
    } else {
      setA(9);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesNowPlaying();
        setMoviesData([...data, data[0], data[1], data[2], data[3]]);
      } catch (error) {
        console.error("Error al obtener los datos de la películas", error);
      }
    };
    getData();

    const interval = setInterval(() => {
      nextMovie();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [a]);

  return (
    <>
      {moviesData ? (
       
            <section className="carousel">
              <div className="carousel_button">
                <figure
                  className="carousel_button_left"
                  onClick={previusMovie}
                >
                  <img src="/images/arrow-left.svg" alt="arrow-left" />
                </figure>
                <figure className="carousel_button_right" onClick={nextMovie}>
                  <img src="/images/arrow-right.svg" alt="arrow-right" />
                </figure>
              </div>
              {moviesData.slice(a, a + 5).map((movie, index) => (
                 <SwitchTransition>
                 <CSSTransition
                   key={a}
                   addEndListener={(node, done) =>
                     node.addEventListener("transitionend", done, false)
                   }
                   classNames="fade"
                 >
                <figure
                  className={`carousel_item fade-item carousel_card carousel_card_${index + 1}`}
                  key={movie.id}
                  id={movie.id}
                >
                  <img
                    className="carousel_card_img"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="poster"
                  />
                  <p className="carousel_card_text">
                    <span className="carousel_card_text_title">
                      {movie.title}
                    </span>
                    <span className="carousel_card_text_subtitle">Estreno</span>
                    <span className="carousel_card_text_release">
                      {" "}
                      {formatterDate(movie.release_date)}
                    </span>
                    <span className="carousel_card_text_subtitle">Generos</span>
                    <span className="carousel_card_text_genres">
                      {movie.genres[0].name}, {movie.genres[1].name}
                    </span>
                    <span className="carousel_card_text_runtime">
                      {" "}
                      {movie.runtime} m{" "}
                    </span>
                  </p>
                </figure>
                </CSSTransition>
        </SwitchTransition>
              ))}
            </section>
         
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Carousel;
