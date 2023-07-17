import axios from "axios";

const URL_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing"
const URL_ID = (id) => {
 return  `https://api.themoviedb.org/3/movie/${id}`
}
const autentication = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njk0ZjRjYjI0MGNlOTkyZjY0ZDNjYmZhNDY5ZjU5NCIsInN1YiI6IjY0YjE5YzUxNzg1NzBlMDBlMzNhMjdmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xV_BMjPu0vgNxSuVuz7torBh-1IAzAEqqIlVBZx8nTU'
      }
}


export const get_movie = async (id) => {
    try {
        const { data } = await axios.get(URL_ID(id), autentication);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }

}
console.log('hola');