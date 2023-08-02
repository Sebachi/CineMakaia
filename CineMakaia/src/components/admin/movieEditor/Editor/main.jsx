import React, { useEffect, useState } from 'react'

function EditorBox(props) {
  const { setEditorState, movies } = props
  const [arraySala, setArraySala] = useState([])

  useEffect(() => {
    if (movies.length > 0) {
      setArraySala(movies.reduce((acc, obj) => {
        const sala = obj.sala;
        const existingArray = acc.find((arr) => arr[0].sala === sala);
        if (existingArray) {
          existingArray.push(obj);
        } else {
          acc.push([obj]);
        }
        return acc;
      }, []));

    }
  }, [movies])

  return (

    <section>
      {arraySala.length > 0 &&
        arraySala.map((sala, index) => (
          <div key={index}  className="editor">
            <p className="editor_salas">
            <span className="editor_salas_sala">Sala {sala[0].sala}</span>
            <span className="editor_functions_button">Nueva Funcion <img src="/images/plus.svg" alt="arrow-down" /></span>
            </p>
            <ul className="editor_horarios">
              {
                sala.map((movie) => (
                  <li key={`funcion ${movie.id}`} className="editor_functions_button">
                    {movie.horario}
                  </li>
              ))
              }
            </ul>
          </div>
        ))}
    </section>
  )
}

export default EditorBox