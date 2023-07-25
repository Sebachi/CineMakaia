import React, { useContext, useEffect, useState } from "react";
import { formatterDate } from "../../../services/formatterDates";
import "./main.scss";
import { AppContext } from "../../../services/Appcontex";
import { useNavigate } from "react-router-dom";

function BodyHome() {
  const  navigate = useNavigate()
  const [moviesData, setMoviesData] = useState(null);
  const first = useContext(AppContext)
  useEffect(() => {
   
    if (first !== null) {setMoviesData(first) }

  }, [first]);
  const handleMovieClick = (dataId) => {
    navigate(`/SelectFilm/${dataId}`, { state: dataId })
  }
  return <>{moviesData ?
<div className='bodyhome'>
  <main className="mainHome">
    <p className="mainHome_text">
    En cartelera
    </p>
    <section className="mainHome_cards">
    {moviesData.map((movie) => (
       <article className="mainHome_cards_child" key={movie.idJson} onClick={()=> handleMovieClick(movie.idJson)}>
           <figure className="mainHome_cards_child_figure">
            <img className="mainHome_cards_child_figure_img" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster_movie" />
            <div className="mainHome_cards_child_figure_hover"> <figure> <img src="/images/film_cyan.svg" alt="film_icon" /> </figure>
            <p>ver</p>
            </div>
            </figure>
            <div className="mainHome_cards_child_text">
                <h3>{movie.title}</h3>
                <span>
                    <strong>Estreno:</strong> {formatterDate(movie.release_date)} <br />
                    <strong>Genero:</strong> {movie.genres[0].name}, {movie.genres[1].name}{movie.genres[2] && `, ${movie.genres[2].name}`}
                </span>

                <p className="mainHome_cards_child_text_runtime"> <strong>{movie.runtime} Minutos</strong> </p>
            </div>

        </article>
    ))}
    </section>
  </main>
  </div>


  : <p>Loading...</p>
  }</>;
}

export default BodyHome;
