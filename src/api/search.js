import { Router } from 'express';
const search = Router();
import axios from 'axios';

export default ({ config, db }) => {

	search.get('/hede', (req, res) => {
			res.json("hedeeeee");
	});

	search.get('/', async (req, res) => {

		const getMovies = async url => {
			try {
				const response = await axios.get(url);
				const data = response.data;
				return data;
			} catch (error) {
				console.log(error);
			}
		};

		try {
			const keyword = req.query.keyword;
			const url = `http://www.omdbapi.com/?apikey=3f1022a5&s=${keyword}&page=1`;
			const response = await getMovies(url);
			res.json(response);
		} catch (error) {
			res.json("error occured");
		}
	})

	return search;
};
