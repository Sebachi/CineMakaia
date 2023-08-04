import React, { useEffect, useRef, useState } from 'react'
import { newScreening } from '../../adminAlerts/newScreening';
import { deleteShowSwal } from '../../adminAlerts/deleteShow';
import { getValidation, patchFunction } from '../../../../services/requestAdmin';
import Swal from 'sweetalert2';
import { deleteCinemaSwal } from '../../adminAlerts/deleteCinema';
import { editCinemaSwal } from '../../adminAlerts/editCinema';


const EditorBox = React.memo(({ editorState, movies, staticState, setStaticState }) => {
  const [arraySala, setArraySala] = useState([])
  const [hoverState, setHoverState] = useState({})
  const [timeState, setTimeState] = useState({})
  const [inputValue, setInputValue] = useState({});
  const [deleteState, setDeleteState] = useState({});
  const inputRef = useRef(null);

  const handleEdit = (editId) => {
    setTimeState((prevTimeState) => ({
      ...prevTimeState,
      [editId]: true,
    }));
  };


  const handleMouseEnter = (hoverId) => {
    setHoverState((prevHoverState) => ({
      ...prevHoverState,
      [hoverId]: true,
    }));
  };

  const handleMouseLeave = (hoverId) => {
    setHoverState((prevHoverState) => ({
      ...prevHoverState,
      [hoverId]: false,
    }));
  };

  const handleKeyPress = (event, movie) => {
    if (event.key === 'Enter') {
      handleAction(movie);
    }
  };

  const handleAction = async (movie) => {
    setTimeState((prevTimeState) => ({
      ...prevTimeState,
      [movie.id]: false,
    }));

    const showEdit = {
      ...movie,
      horario: inputValue[movie.id]
    }

    const data = await getValidation(showEdit.teatro, showEdit.sala, showEdit.horario);
    if (data.length > 0) {
      await Swal.fire({
        title: 'La funcion que intentas ocupar ya está en uso',
        text: "Intenta de nuevo con otro horario diferente",
        confirmButtonText: 'Listo!',
      });
    } else {
      await patchFunction(movie.id, showEdit)
      setStaticState(!staticState);
    }
  };

  const handleInputChange = (e, editId) => {
    setInputValue((prevInputState) => ({
      ...prevInputState,
      [editId]: e.target.value,
    }));
  }






  const horariosEnMinutos = {
    "10:00 AM": 600,
    "11:00 AM": 660,
    "12:00 PM": 720,
    "1:00 PM": 780,
    "2:00 PM": 840,
    "3:00 PM": 900,
    "4:00 PM": 960,
    "5:00 PM": 1020,
    "6:00 PM": 1080,
    "7:00 PM": 1140,
    "8:00 PM": 1200,
    "9:00 PM": 1260
  };

  useEffect(() => {
    if (movies.length > 0) {
      const uniqueSalas = new Set();
      movies.forEach(obj => uniqueSalas.add(obj.sala));
      const uniqueSalasArray = Array.from(uniqueSalas);

      const combinedArray = uniqueSalasArray.map(sala => {
        return movies.filter(obj => obj.sala === sala);
      });
      combinedArray.sort((a, b) => a[0].sala - b[0].sala);
      setArraySala(combinedArray);
    }
  }, [movies, staticState]);

  return (
    <section>
      {arraySala.length > 0 &&
        arraySala.map((sala, index) => (
          <div key={`funcion_${sala[0].sala}_${sala[0].horario}`} className="editor">
            <section className="editor_salas">

              {timeState[`Sala ${sala[0].sala}`] ? (
                <input

                  type="text"
                  className="editor_salas_input"
                  onMouseEnter={() => handleMouseEnter(`Sala ${sala[0].sala}`)}
                    onMouseLeave={() => handleMouseLeave(`Sala ${sala[0].sala}`)}
                  value={inputValue[`Sala ${sala[0].sala}`] || `Sala ${sala[0].sala}`}
                  onChange={(e) => handleInputChange(e, `Sala ${sala[0].sala}`)}
                  onKeyPress={(e) => editCinemaSwal(e, sala, inputValue, setTimeState, setStaticState, staticState, setInputValue)}
                  ref={inputRef}
                />
              )
                : (
                  <div onMouseEnter={() => handleMouseEnter(`Sala ${sala[0].sala}`)}
                    onMouseLeave={() => handleMouseLeave(`Sala ${sala[0].sala}`)}
                    className="editor_salas_container"
                  >
                    <span className="editor_salas_sala"
                    >Sala {sala[0].sala}</span>
                    {
                      hoverState[`Sala ${sala[0].sala}`] &&
                      <>
                        <figure className='editor_functions_hovers_button' onClick={() => handleEdit(`Sala ${sala[0].sala}`)}>
                          <img src="/images/edit_yellow.svg" alt="edit_yellow" />
                        </figure>
                        <figure className='editor_functions_hovers_button' onClick={() => deleteCinemaSwal(sala, staticState, setStaticState)}>
                          <img src="/images/cross_red.svg" alt="cross_red" />
                        </figure>
                      </>
                    }
                  </div>

                )}
              {
                index === 0 && <span className="editor_functions_button" onClick={() => newScreening(sala[0].pelicula, sala[0].fecha, sala[0].teatro, staticState, setStaticState)}>Nueva Funcion <img src="/images/plus.svg" alt="arrow-down" /></span>
              }
            </section>
            <ul className="editor_horarios">
              {
                sala
                  .sort((a, b) => horariosEnMinutos[a.horario] - horariosEnMinutos[b.horario])
                  .map((movie) => (

                    <li key={`funcion_${movie.id}_${movie.horario}`}
                      className="editor_time"
                      onMouseEnter={() => handleMouseEnter(movie.id)}
                      onMouseLeave={() => handleMouseLeave(movie.id)}
                      onClick={() => console.log(movie.id)}
                    >
                      {timeState[movie.id] ? (
                        <input

                          type="text"
                          className="editor_time_input"
                          onMouseEnter={() => handleMouseEnter(movie.id)}
                          onMouseLeave={() => handleMouseLeave(movie.id)}
                          value={inputValue[movie.id] || movie.horario}
                          onChange={(e) => handleInputChange(e, movie.id)}
                          onKeyPress={(e) => handleKeyPress(e, movie)}
                          ref={inputRef}
                        />
                      )
                        : (
                          <>
                            {movie.horario}
                            {hoverState[movie.id] && (
                              <div className='editor_functions_hovers'>
                                <figure className='editor_functions_hovers_button' onClick={() => handleEdit(movie.id)}>
                                  <img src="/images/edit_yellow.svg" alt="edit_yellow" />
                                </figure>
                                <figure className='editor_functions_hovers_button' onClick={() => deleteShowSwal(movie.id, staticState, setStaticState)}>
                                  <img src="/images/cross_red.svg" alt="cross_red" />
                                </figure>
                              </div>
                            )}
                          </>
                        )}
                    </li>
                  ))
              }
            </ul>
          </div>
        ))}
    </section>
  )
});

export default EditorBox;