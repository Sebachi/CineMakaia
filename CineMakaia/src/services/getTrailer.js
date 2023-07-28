import axios from "axios";

export const get_trailer = async (movieId) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7694f4cb240ce992f64d3cbfa469f594&language=en-EN`);
        const videoInf = data.results.find((item) =>
          item.type.toLowerCase().includes("trailer")
        );
        const trailer = `https://www.youtube.com/embed/${videoInf.key}`
        
        return trailer;
      } catch (error) {
        console.log(error);
        return error;
      }
}