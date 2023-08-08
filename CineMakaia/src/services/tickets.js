import axios from "axios";
const URL_FUNCTIONS = "https://backend-cinemakaia.onrender.com/funciones";
const URL_FUNCT_ID = (id) => {
  return `${URL_FUNCTIONS}?pelicula=${id}`
}
export const URL_QR = "https://backend-cinemakaia.onrender.com/recibos/"


const URL_FUNCT_ID2 = (id) => {
  //return `${URL_FUNCTIONS}?pelicula=${id}`
  return `${URL_FUNCTIONS}/${id}`
}

export const get_tickets = async (id) => {
  try {
    const { data } = await axios.get(URL_FUNCT_ID(id));
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const get_tickets2 = async (id) => {
  try {
    const { data, status } = await axios.get(URL_FUNCT_ID2(id));
    let response = [data, status]
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const patch_tickets2 = async (id, newSeats) => {
  try {
    await axios.patch(URL_FUNCT_ID2(id), newSeats);
    const resultado = "funciono"
    return resultado;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const post_qr = async (voucher) => {
  try {
    await axios.post(URL_QR, voucher);
  } catch (error) {
    console.log(error);
    return error;
  }
}