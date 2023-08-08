import Swal from "sweetalert2"
import {getValidationCinema, patchFunction } from "../../../services/requestAdmin"

export const editCinemaSwal = async (sala, setStaticState, staticState) => {
    const theaters = {
        1: "Sala 1",
        2: "Sala 2",
        3: "Sala 3",
        4: "Sala 4",
        5: "Sala 5",
        6: "Sala 6",
        7: "Sala 7",
        8: "Sala 8",
        9: "Sala 9",
        10: "Sala 10",
        11: "Sala 11",
        12: "Sala 12",
        13: "Sala 13",
        14: "Sala 14",
        15: "Sala 15"
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

    const sala2 = await Swal.fire({
        title: `Selecciona la sala por la cual deseas cambiar la sala ${sala[0].sala}`,
        input: 'select',
        confirmButtonText: 'Cambiar !',
        cancelButtonText: 'Cancelar',
        inputOptions: {
            'Salas': theaters
        },
        inputPlaceholder: 'Selecciona una sala',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Selecciona una sala';
            }
            return null;
        }
    });
    if (sala2.isDismissed) {
        return;
    }
    const data = await getValidationCinema(sala[0].teatro, sala2.value);
    if (data.length > 0) {
        const { isConfirmed } = await Swal.fire({
            title: 'La sala que intentas ocupar ya esta en uso',
            text: "Intenta de nuevo con otra sala diferente",
            showCancelButton: true,
            confirmButtonText: 'Listo!',
            cancelButtonText: 'Cancelar',
        });
        if (isConfirmed) {
            editCinemaSwal(sala);
        }
    }
    else {
        try {
            for (const movie of sala) {
                const showEdit = {
                    ...movie,
                    sala: sala2.value
                }
                await  patchFunction(movie.id, showEdit);
            }
            setStaticState(!staticState);
            showSuccessAlert();
        }
        catch (error) {
            console.error('Error al eliminar funciones:', error);
            showErrorAlert();
        };
    }
}