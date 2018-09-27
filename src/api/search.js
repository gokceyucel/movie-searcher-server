import { Router } from 'express';
const search = Router();
import cache from '../middleware/cache';
import { getMoreMovies } from '../service/searchService';

export default ({ config }) => {

	// FUNCTIONAL_REQUIREMENT_BACKEND_1
	// FUNCTIONAL_REQUIREMENT_BACKEND_4
	search.get('/', cache, async (req, res) => {

		try {
			const keyword = req.query.keyword;
			const response = await getMoreMovies(keyword);

			// FUNCTIONAL_REQUIREMENT_BACKEND_3
			res.setHeader('Cache-Control', 'private, max-age=30');
			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'An error occured', error });
		}
	});

	return search;
};
