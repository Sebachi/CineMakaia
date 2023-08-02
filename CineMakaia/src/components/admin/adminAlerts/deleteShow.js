import Swal from "sweetalert2"
import { deleteShow } from "../../../services/requestAdmin"



export const deleteShowSwal = async (idShow, staticState, setStaticState) => {



  Swal.fire({
    title: 'Estas seguro que deseas eleminar esta funcion?',
    text: "No podras volver atras!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0098BC',
    cancelButtonColor: '#a5a5a5',
    cancelButtonText: 'No, mejor no 😅',
    confirmButtonText: 'Eliminala 👿!'
  }).then((result) => {
    if (result.isConfirmed) {
      const deleteFunction = async () => {
        await deleteShow(idShow)
        setStaticState(!staticState);
        Swal.fire(
          {
            title: 'Eliminado!',
            text: 'La funcion ha sido eliminada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Listo!'
          }
        )
      }
      deleteFunction()

    }
    else if (result.isDismissed) {
      return;
    }

  })


}