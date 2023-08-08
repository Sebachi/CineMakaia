import Swal from "sweetalert2"
import { getValidation, postFunction } from "../../../services/requestAdmin";


export const newScreening = async (idJSON, fecha, cinema, staticState, setStaticState) => {

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
    const horarios = {
      "10:00 AM": "10:00 AM",
      "11:00 AM": "11:00 AM",
      "12:00 PM": "12:00 PM",
      "1:00 PM": "1:00 PM",
      "2:00 PM": "2:00 PM",
      "3:00 PM": "3:00 PM",
      "4:00 PM": "4:00 PM",
      "5:00 PM": "5:00 PM",
      "6:00 PM": "6:00 PM",
      "7:00 PM": "7:00 PM",
      "8:00 PM": "8:00 PM",
      "9:00 PM": "9:00 PM"
    };

    const sala = await Swal.fire({
      title: 'Selecciona una sala',
      input: 'select',
      confirmButtonText: 'Listo!',
      cancelButtonText: 'Cancelar',
      inputOptions: {
        'Salas': theaters
      },
      inputPlaceholder: 'Selecciona una sala',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Selecciona una sala';
        }
        return null;
      }
    });
  
    if (sala.isDismissed) {
      return; // El usuario cerró el Swal, salimos de la función
    }
  
    const horario = await Swal.fire({
      title: 'Selecciona un horario',
      input: 'select',
      confirmButtonText: 'Listo!',
      inputOptions: {
        'Horarios': horarios
      },
      inputPlaceholder: 'Selecciona un horario',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Selecciona un horario';
        }
        return null;
      }
    });
  
    if (horario.isDismissed) {
      return; // El usuario cerró el Swal, salimos de la función
    }
  
    const newShow = {
      "teatro": cinema,
      "sala": parseInt(sala.value),
      "fecha": fecha,
      "horario": horario.value,
      "pelicula": idJSON,
      "asientos": []
    };
  
    const data = await getValidation(newShow.teatro, newShow.sala, newShow.horario);
  
    if (data.length > 0) {
      const { isConfirmed } = await Swal.fire({
        title: 'La funcion que intentas ocupar ya está en uso',
        text: "Intenta de nuevo con otra sala de cine",
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonText: 'Listo!',

      });
  
      if (isConfirmed) {
        newScreening(idJSON, fecha, cinema);
      }
    } else {
      await postFunction(newShow);
      await setStaticState(!staticState);
      console.log(staticState);
      Swal.fire('La nueva función ha sido creada con éxito');
    }
  };