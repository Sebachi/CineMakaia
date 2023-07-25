import React, { useContext, useEffect, useState } from "react";
import "./main.scss";
import { formatterDate } from "../../../services/formatterDates";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { AppContext } from "../../../services/Appcontex";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const [moviesData, setMoviesData] = useState(null);
  const [a, setA] = useState(0);
  const navigate = useNavigate()
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

  const first = useContext(AppContext)
  useEffect(() => {
    if (first.length > 0) {
      setMoviesData([...first,first[0],first[1],first[2], first[3]]) }
  }, [first]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [a]);

  const handleMovieClick = (dataId) => {
    navigate(`/SelectFilm/${dataId}`, { state: dataId })
  }

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
                 <SwitchTransition  key={index+1}>
                 <CSSTransition
                   key={a}
                   addEndListener={(node, done) =>
                     node.addEventListener("transitionend", done, false)
                   }
                   classNames="fade"
                 >
                <article
                  className={`carousel_item fade-item carousel_card carousel_card_${index + 1}`}
                  key={movie.id}
                  id={movie.id}
                  data-id={movie.idJson}
                   onClick={()=> handleMovieClick(movie.idJson - 1) }
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
                </article>
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
