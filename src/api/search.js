import { Router } from 'express';
const search = Router();
import cache from 'memory-cache';
import { getMoreMovies } from '../service/searchService';

export default ({ config, db }) => {

	search.get('/', async (req, res) => {

		try {
			const keyword = req.query.keyword;

			// TODO: move cache mechanism elsewhere https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
			const cachedResponse = cache.get(keyword);
			if (cachedResponse) {
				return res.json(cachedResponse);
			}

			const response = await getMoreMovies(keyword);

			res.setHeader('Cache-Control', 'private, max-age=30');
			
			cache.put(keyword, response);

			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json("error occured");
		}
	});

	return search;
};
