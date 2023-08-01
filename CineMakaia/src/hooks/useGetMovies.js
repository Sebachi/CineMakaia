import { useEffect } from "react";
import { getMovieFunctions } from "../services/createMovieFunctions";


export const useGetMovie = (idJSONMovie, date, setMovieFunctions) => {
  
    useEffect(() => {
        const fetchData = async () => {
       try {
       const movieFunctions = await getMovieFunctions(idJSONMovie, date)
        setMovieFunctions(movieFunctions)
    }  catch(error){
        console.log(error);
        return error
    }}
    date && fetchData()


    }, [date])


}

