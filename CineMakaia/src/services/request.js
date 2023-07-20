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

const nowPlaying = async () => {
  try {
    const listNowPlaying = []
    const { data } = await axios.get(URL_NOW_PLAYING, autentication);
    const response = data.results
    for (let i = 0; i <= 9; i++) {
      const element = response[i];
      const currentMovie = {
        "pelicula": (i + 1) ,
        "movieId": element.id
      }
      listNowPlaying.push(currentMovie)
    }
  
    return listNowPlaying;
  } catch (error) {
    console.log(error);
    return error;
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


export const getMoviesNowPlaying = async () => {
  try {
    const listNowPlaying = await nowPlaying()
    const nowPlayingMovies = []
    for (let i = 0; i <  listNowPlaying.length; i++) {
        const element = listNowPlaying[i];
        const data = await get_movie(element.movieId);
        data.idJson = i + 1
        nowPlayingMovies.push(data)
    }
  return nowPlayingMovies

  } catch (error) {
    console.error("Error al obtener los datos de las películas", error);
  }
};

