import axios from 'axios';
import config from '../config.json';

const { apiScheme, apiUrl, apiKey } = config;

const getMovies = async (keyword = 'future', page = 1) => {
  try {
    const pageNumber = page;
    const requestUrl = `${apiScheme}://${apiUrl}/?apikey=${apiKey}&s=${keyword}&page=${pageNumber}`;
    const response = await axios.get(requestUrl);
    const movies = response.data;
    return movies;
  } catch (error) {
    return console.error(error);
  }
};

const getMoreMovies = async (keyword = 'godfather') => {
  try {
    const movies = await getMovies(keyword);
    const totalMoviesCount = movies.totalResults;
    
    if (totalMoviesCount > 10) {
      const moviesPage2 = await getMovies(keyword, 2);
      const movies20 = [ ...movies.Search, ...moviesPage2.Search ];
      return movies20;
    }

    return movies;
  } catch (error) {
    console.error(error);
  }
};

export {
  getMovies,
  getMoreMovies
};
