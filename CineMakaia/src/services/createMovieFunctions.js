import axios from "axios";
import { endpointCinema } from "./data";



export const getMovieFunctions = async (idJSONMovie, date) => {
    try {
        const { data } = await axios.get(`${endpointCinema.functions}?pelicula=${idJSONMovie}`)
        const movieFirstFilter = data.filter((item) => item.fecha === date);
        if (movieFirstFilter.length === 0) {
            // Obtener objetos únicos con diferentes valores de "horario", "sala" y "teatro"
            const uniqueFunctions = [];
            const uniqueFunctionKeys = new Set();

            data.forEach((item) => {
                const { horario, sala, teatro } = item;
                const key = `${horario}-${sala}-${teatro}`;

                if (!uniqueFunctionKeys.has(key)) {
                    uniqueFunctionKeys.add(key);
                    uniqueFunctions.push({ horario, sala, teatro });
                }
            });

            // Agregar las propiedades "fecha" y "asientos" a cada objeto único
            const functionsWithDateAndSeats = uniqueFunctions.map((func) => ({
                ...func,
                fecha: date,
                asientos: [],
                pelicula: idJSONMovie
            }));

            // Realizar una solicitud POST a endpointCinema.functions con cada objeto modificado
            const postRequests = functionsWithDateAndSeats.map(async (func) => {
                try {
                    return await axios.post(`${endpointCinema.functions}`, func);
                } catch (error) {
                    console.log('Error al realizar la solicitud POST:', error);
                    return error;
                }
            });

            await Promise.all(postRequests);

        } else {
            return movieFirstFilter
        }



    } catch (error) {
        console.log(error);
        return error
    }
}