export const get_movieOmdb = async (omdbId) => {
    try {
        const { data } = await axios.get(`https://www.omdbapi.com/?i=${omdbId}&apikey=d937315c`);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
}