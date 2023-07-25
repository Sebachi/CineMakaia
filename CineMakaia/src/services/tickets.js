import axios from "axios";
const URL_FUNCTIONS = "http://localhost:3033/funciones";
const URL_FUNCT_ID = (id) => {
  return `${URL_FUNCTIONS}?pelicula=${id}`
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