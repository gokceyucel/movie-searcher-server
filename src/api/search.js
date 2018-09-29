import { Router } from 'express';
const searchRouter = Router();
import { getMoreMovies } from '../service/searchService';

export default ({ cache }) => {
	// FUNCTIONAL_REQUIREMENT_BACKEND_1
	// FUNCTIONAL_REQUIREMENT_BACKEND_4
	searchRouter.get('/', cache.cache, async (req, res) => {

		try {
			const keyword = req.query.keyword;
			const response = await getMoreMovies(keyword);

			// FUNCTIONAL_REQUIREMENT_BACKEND_3
			res.setHeader('Cache-Control', 'private, max-age=30');
			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: 'An error occured', error });
		}
	});

	return searchRouter;
};
