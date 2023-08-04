import Swal from "sweetalert2"
import { deleteShow, getValidationCinema, patchFunction } from "../../../services/requestAdmin"

export const editCinemaSwal = async (e, sala, inputValue, setTimeState, setStaticState, staticState, setInputValue) => {
    const nameState = `Sala ${sala[0].sala}`
   

    const extractNumberFromSala = (salaString) => {
        const match = salaString.match(/\d+/); 
        if (match) {
          return Number(match[0]); 
        }
        return null; 
      };
      const data = await getValidationCinema(sala[0].teatro, extractNumberFromSala(inputValue[nameState]));

    const handleAction = async (movie) => {
        setTimeState((prevTimeState) => ({
            ...prevTimeState,
            [nameState]: false,
        }));

        const showEdit = {
            ...movie,
            sala: extractNumberFromSala(inputValue[nameState])
        }
        await patchFunction(movie.id, showEdit)
    };
    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Editado!',
            text: 'Las funciones han cambiado de sala exitosamente.',
            icon: 'success',
            confirmButtonText: 'Listo!'
        });
    };
    const showErrorAlert = () => {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al eliminar las funciones.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            Swal.fire({
                title: `¿Estas seguro que deseas editar la sala de todas las funciones con sala ${sala[0].sala}?`,
                text: "No podras volver atras!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, mejor no 😅',
                confirmButtonText: 'Editala 😝!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const handleEdit = async () => {
                        if (data.length > 0) {
                            console.log(data);
                            await Swal.fire({
                                title: 'La funcion que intentas ocupar ya está en uso',
                                text: "Intenta de nuevo con otro horario diferente",
                                confirmButtonText: 'Listo!',
                            });
                            setTimeState((prevTimeState) => ({
                                ...prevTimeState,
                                [nameState]: false,
                            }));
                        } else {
                            try {
                                for (const movie of sala) {
                                    await handleAction(movie);
                                }
                                setTimeState((prevTimeState) => ({
                                    ...prevTimeState,
                                    [nameState]: false,
                                }));
                                setStaticState(!staticState);
                                showSuccessAlert();
                            }
                            catch (error) {
                                console.error('Error al eliminar funciones:', error);
                                showErrorAlert();
                            };
                        }
                    }
                    handleEdit()
                }
                else if (result.isDismissed) {
                    setInputValue((prevTimeState) => ({
                        ...prevTimeState,
                        [nameState]: nameState,
                    }));
                    setTimeState((prevTimeState) => ({
                        ...prevTimeState,
                        [nameState]: false,
                    }));
                    return;
                }
            })
        }
    }
    handleKeyPress(e)
};

