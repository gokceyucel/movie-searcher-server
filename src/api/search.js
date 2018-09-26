import { Router } from 'express';
const search = Router();
import cache from '../middleware/cache';
import { getMoreMovies } from '../service/searchService';

export default ({ config }) => {

	search.get('/', cache, async (req, res) => {

		try {
			const keyword = req.query.keyword;
			const response = await getMoreMovies(keyword);

			// Move elsewhere
			res.setHeader('Cache-Control', 'private, max-age=30');
			
			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json("error occured");
		}
	});

	return search;
};
