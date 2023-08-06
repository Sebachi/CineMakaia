import Swal from "sweetalert2"
import { deleteShow } from "../../../services/requestAdmin"



export const deleteCinemaSwal = async (cinema, staticState, setStaticState) => {



  Swal.fire({
    title: `¿Estas seguro que deseas eliminar todas las funciones en la sala ${cinema[0].sala}?`,
    text: "No podras volver atras!",
   // icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No, mejor no 😅',
    confirmButtonText: 'Eliminala 👿!'
  }).then((result) => {
    if (result.isConfirmed) {
        const deleteFunction = async () => {
            for (const sala of cinema) {
              await deleteShow(sala.id);
            }
          };

          deleteFunction()
          .then(() => {
            setStaticState(!staticState);
            showSuccessAlert();
          })
          .catch(error => {
            console.error('Error al eliminar funciones:', error);
            showErrorAlert();
          }); 


          const showSuccessAlert = () => {
            Swal.fire({
              title: 'Eliminado!',
              text: 'Las funciones han sido eliminadas exitosamente.',
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
        
        }

    //   const deleteFunction = async () => {
    //    await cinema.forEach((sala)=>{
    //          deleteShow(sala.id)
    //     })
        
    //     setStaticState(!staticState);
    //     Swal.fire(
    //       {
    //         title: 'Eliminado!',
    //         text: 'La funcion ha sido eliminada exitosamente.',
    //         icon: 'success',
    //         confirmButtonText: 'Listo!'
    //       }
    //     )
    //   }
    //   deleteFunction()

   
    else if (result.isDismissed) {
      return;
    }

  })


}