import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "../../header/nav/main";
import "./main.scss";
import { formatterDate } from "../../../services/formatterDates";
import { get_movieOmdb } from "../../../services/requestOmdb";
import { ratedReader } from "../../../services/ratedReading";
import { get_trailer } from "../../../services/getTrailer";
import useDaysArray from "../../../hooks/useDaysArray";
import DatePickerAdmin from "../datepickerAdmin/main";
import dayjs from "dayjs";
import EditorBox from "./Editor/main";
import { useGetMovie } from "../../../hooks/useGetMovies";

function MovieEditor({ signIn, login }) {
  const location = useLocation();
  const movie = location.state;
  const [movieOmdb, setMovieOmdb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const daysArray = useDaysArray(selectedDay);
  const [movieFunctions, setMovieFunctions] = useState([]);
  const [dateFunction, setDateFunction] = useState(false);

  const handleChangeDate = (dateSelected) => {
    setSelectedDay(dateSelected);
  };
  useEffect(() => {
    const dateLocal = dayjs(selectedDay).format("DD/MM/YYYY");
    localStorage.setItem("dateAdmin", dateLocal);
    setDateFunction(localStorage.getItem("dateAdmin"));
    
  }, [selectedDay]);
  
  const [editorState, setEditorState] = useState({});
  const handleEditorToggle = (boxId) => {
    setEditorState((prevEditorState) => ({
      ...prevEditorState,
      [boxId]: !prevEditorState[boxId],
    }));
  };

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


 useGetMovie(movie.idJson, dateFunction, setMovieFunctions);



  return (
    <>
      <div className="background_movieEditor"></div>
      <div className="topNav_admin">
        <TopNav signIn={signIn} login={login} isAdmin={true} />
      </div>
      {movieOmdb ? (
        <section className="movieEditor">
          <article className="movieEditor_top">
            <figure className="movieEditor_top_figure">
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
              ></iframe>
              <div className="movieEditor_top_trailer_text">
                <span className="movieEditor_title">{movie.title}</span>
                <span className="movieEditor_release">
                  Estreno: {formatterDate(movie.release_date)}
                </span>
                <span className="movieEditor_genres">{movieOmdb.Genre}</span>
                <span className="movieEditor_ratedmin">
                  <span className="movieEditor_rated">
                    {ratedReader(movieOmdb?.Rated)}
                  </span>
                  <span className="movieEditor_runtime">
                    {" "}
                    {movie.runtime} Min
                  </span>
                </span>
              </div>
              <figure className="movieEditor_top_trailer_play">
                <img src="/images/play-circle.svg" alt="play-circle" />
              </figure>
            </section>
          </article>

          <article className="movieEditor_bottom">
            <section className="movieEditor_bottom_text">
              <p className="movieEditor_bottom_text_inf">{movie.overview}</p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">
                  Titulo Original
                </span>
                <span className="movieEditor_bottom_text_inf">
                  {movie.original_title}
                </span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">
                  Pais de origen
                </span>
                <span className="movieEditor_bottom_text_inf">
                  {movieOmdb.Country}
                </span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">
                  Director
                </span>
                <span className="movieEditor_bottom_text_inf">
                  {movieOmdb.Director}
                </span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">
                  Actores
                </span>
                <span className="movieEditor_bottom_text_inf">
                  {movieOmdb.Actors}
                </span>
              </p>
              <p className="movieEditor_bottom_text_container">
                <span className="movieEditor_bottom_text_subtitle">
                  Lenguaje
                </span>
                <span className="movieEditor_bottom_text_inf">
                  {movieOmdb.Language}
                </span>
              </p>
            </section>
            <section className="movieEditor_bottom_editor">
              <section className="movieEditor_bottom_editor_calendar_container">
                <ul className="movieEditor_bottom_editor_calendar_days">
                  {daysArray.map((dayItem, index) => (
                    <React.Fragment key={dayItem.dayNumber}>
                      {index == 0 && (
                        <div className="movie_ActualMoth">{dayItem.month}</div>
                      )}
                      <li
                        className={index == 0 ? "active_date" : ""}
                        onClick={() => handleChangeDate(dayItem.date)}
                      >
                        <span className="movie_dayNumber">
                          {dayItem.dayNumber}
                        </span>
                        <span className="movie_dayName">{dayItem.dayName}</span>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
                <div className="movieEditor_calendar_button">
                  <DatePickerAdmin
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </div>
              </section>
              <section className="editor_functions">
                <div className="editor_functions_header">
                  <span>Funciones por multiplex </span>
                  <div className="editor_functions_button">
                    Nuevo multiplex{" "}
                    <img src="/images/plus.svg" alt="arrow-down" />
                  </div>
                </div>
                <div className="editor_functions_body">
                  <span>Marco Plaza del Mar</span>
                  <figure className="editor_functions_arrow">
                    <img src="/images/arrow_up.svg" alt="arrow-down" />
                  </figure>
                </div>
                <EditorBox editorState={setEditorState} />
                <div className="editor_functions_body">
                  <span>Marco Plaza del Mar</span>
                  <figure className="editor_functions_arrow">
                    <img src="/images/arrow_up.svg" alt="arrow-down" />
                  </figure>
                </div>
                <div className="editor_functions_body">
                  <span>Marco Plaza del Mar</span>
                  <figure className="editor_functions_arrow">
                    <img src="/images/arrow_up.svg" alt="arrow-down" />
                  </figure>
                </div>
              </section>
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
