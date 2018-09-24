import { Router } from 'express';
const search = Router();
import axios from 'axios';

export default ({ config, db }) => {

	search.get('/hede', (req, res) => {
			res.json("hedeeeee");
	});

	search.get('/', async (req, res) => {

		// TODO: move this elsewhere. Maybe to a service.
		const getMovies = async (keyword, page) => {
			try {
				// Get this url from config along with api key.
				const pageNumber = page || 1;
				const url = `http://www.omdbapi.com/?apikey=3f1022a5&s=${keyword}&page=${pageNumber}`;
				const response = await axios.get(url);
				const data = response.data;
				return data;
			} catch (error) {
				// TODO: do a better error handling. Not returning any response in case of an error.
				console.error(error);
			}
		}

		const get20movies = async keyword => {
			try {
				const movies = await getMovies(keyword);
				const totalMoviesCount = movies.totalResults;
				if (totalMoviesCount > 10) {
					const moviesPage2 = await getMovies(keyword, 2);
					const movies20 = [...movies.Search, ...moviesPage2.Search];
					return movies20;
				}
			} catch(error) {
				console.error(error);
			}
		}

		try {
			const keyword = req.query.keyword;
			const response = await get20movies(keyword);
			res.json(response);
		} catch (error) {
			res.json("error occured");
		}
	})

	return search;
};
