import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "../../header/nav/main";
import "./main.scss";
import { formatterDate } from "../../../services/formatterDates";
import { get_movieOmdb } from "../../../services/requestOmdb";
import { ratedReader } from "../../../services/ratedReading";
import { get_trailer } from "../../../services/getTrailer";
import { getDaysArray } from "../../../services/daysArray";
import DatePickerAdmin from "../datepickerAdmin/main";

function MovieEditor({ signIn, login }) {
  const location = useLocation();
  const movie = location.state;
  //console.log(location.state);
  const [movieOmdb, setMovieOmdb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const daysArray = getDaysArray()
  useEffect(() => {
    const getMovieInf = async () => {
      try {
        const movieInf = await get_movieOmdb(movie.imdb_id);
        const trailerUrl = await get_trailer(movie.id);
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
      <div className="background_movieEditor"></div>
      <div className="topNav_admin">
        <TopNav signIn={signIn} login={login} isAdmin={true} />
      </div>
      {movieOmdb ? (
        <section className="movieEditor">
          <article className="movieEditor_top">
            <figure  className="movieEditor_top_figure">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            </figure>
            <section className="movieEditor_top_trailer">
            <iframe
              id="youtube-player"
              className="movieEditor_top_trailer_iframe"
              src={trailer}
              title={movie.title}
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            >
            </iframe>
              <div className="movieEditor_top_trailer_text"> 
                <span className="movieEditor_title">{movie.title}</span>
                <span className="movieEditor_release">Estreno:  {formatterDate(movie.release_date)}</span>
                <span className="movieEditor_genres">
                      {movieOmdb.Genre}
                </span>
                <span className="movieEditor_ratedmin">
                  <span className="movieEditor_rated">{ratedReader(movieOmdb?.Rated)}</span>
                  <span className="movieEditor_runtime"> {movie.runtime} Min</span>
                </span>
              </div>
            </section>
          </article>

          <article className="movieEditor_bottom">
            <section className="movieEditor_bottom_text">
              <p className="movieEditor_bottom_text_inf">{movie.overview}</p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">Titulo Original</span>
                <span className="movieEditor_bottom_text_inf">{movie.original_title}</span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">Pais de origen</span>
                <span className="movieEditor_bottom_text_inf">{movieOmdb.Country}</span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">Director</span>
                <span className="movieEditor_bottom_text_inf">{movieOmdb.Director}</span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">Actores</span>
                <span className="movieEditor_bottom_text_inf">{movieOmdb.Actors}</span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">Lenguaje</span>
                <span className="movieEditor_bottom_text_inf">{movieOmdb.Language}</span>
              </p>
            </section>
            <section className="movieEditor_bottom_editor">
              <div className="movieEditor_bottom_editor_calendar_container">
                <ul  className="movieEditor_bottom_editor_calendar_days">
                  {
                    daysArray.map(dayItem=> (
                      <li key={dayItem.dayNumber}>
                        <span className="movie_dayNumber">{dayItem.dayNumber}</span>
                        <span className="movie_dayName">{dayItem.dayName}</span>
                      </li>
                    ))
                  }
                </ul>
                <div className="movieEditor_calendar_button">
                 <DatePickerAdmin/>
                </div>
              </div>
              <div>
                
              </div>
            </section>
          </article>

        </section>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default MovieEditor;
