import axios from "axios";
import { endpointCinema } from "./data";




export const patchFunction = async (idFunction, newFunction) => {
    try {
      await axios.patch(`${endpointCinema.functions}/${idFunction}`, newFunction);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const deleteShow = async (idShow) => {
    try {
      await axios.delete(`${endpointCinema.functions}/${idShow}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const postFunction = async  (newShow) => {
    try {
        return await axios.post(`${endpointCinema.functions}`, newShow);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const getValidation = async (cinema, sala, horario) => {
    try {
        const { data } = await axios.get(`${endpointCinema.functions}?teatro=${cinema}&sala=${sala}&horario=${horario}`);
        return data
      } catch (error) {
        console.log(error);
        return error;
      }
}

export const getValidationCinema = async (cinema, sala) => {
  try {
      const { data } = await axios.get(`${endpointCinema.functions}?teatro=${cinema}&sala=${sala}`);
      return data
    } catch (error) {
      console.log(error);
      return error;
    }
}