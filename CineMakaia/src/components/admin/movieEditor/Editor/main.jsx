import React, { useEffect, useState } from 'react'
import { newScreening } from '../../adminAlerts/newScreening';

const EditorBox = React.memo(({ editorState, movies, staticState, setStaticState }) => {
  const [arraySala, setArraySala] = useState([])

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
            <p className="editor_salas">
              <span className="editor_salas_sala">Sala {sala[0].sala}</span>
              {
                index === 0 && <span className="editor_functions_button" onClick={() => newScreening(sala[0].pelicula, sala[0].fecha, sala[0].teatro, staticState, setStaticState)}>Nueva Funcion <img src="/images/plus.svg" alt="arrow-down" /></span>
              }
            </p>
            <ul className="editor_horarios">
              {
                sala
                .sort((a, b) => horariosEnMinutos[a.horario] - horariosEnMinutos[b.horario])
                .map((movie) => (
                  <li key={`funcion_${movie.id}_${movie.horario}`} className="editor_functions_button">
                    {movie.horario}
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