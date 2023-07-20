import React, { useEffect, useState } from "react";
import { getMoviesNowPlaying } from "../../../services/request";
import { formatterDate } from "../../../services/formatterDates";
import "./main.scss";

function BodyHome() {
  const [moviesData, setMoviesData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesNowPlaying();
        setMoviesData(data);
        return data;
      } catch (error) {
        console.error("Error al obtener los datos de la películas", error);
      }
    };
    getData();
  }, []);
  return <>{moviesData ?

  <main className="mainHome">
    <p className="mainHome_text">
    En cartelera:
    </p>
    <section className="mainHome_cards">
    {moviesData.map((movie) => (
       <article className="mainHome_cards_child">
           <figure className="mainHome_cards_child_figure">
            <img className="mainHome_cards_child_figure_img" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster_movie" />
            <div className="mainHome_cards_child_figure_hover"> <figure> <img src="/images/film_cyan.svg" alt="film_icon" /> </figure>
            <p>ver</p>
            </div>
            </figure>
            <p className="mainHome_cards_child_text">
                <h3>{movie.title}</h3>
                <span>
                    <strong>Estreno:</strong> {formatterDate(movie.release_date)} <br />
                    <strong>Genero:</strong> {movie.genres[0].name}, {movie.genres[1].name}{movie.genres[2] && `, ${movie.genres[2].name}`}
                </span>

                <p className="mainHome_cards_child_text_runtime"> <strong>{movie.runtime} Minutos</strong> </p>
            </p>

        </article>
       
    ))}
    </section>
  </main>



  : <p>Loading...</p>
  }</>;
}

export default BodyHome;
