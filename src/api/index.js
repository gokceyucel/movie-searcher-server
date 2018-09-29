import { version } from '../../package.json';
import { Router } from 'express';
import search from './search';
import cacheRouter from './cache';

export default ({ cache }) => {
	let apiRouter = Router();

	// Expose some API metadata at the root
	apiRouter.get('/', (req, res) => {
		res.json({ version });
	});

	apiRouter.use('/search', search({ cache }));
	apiRouter.use('/cache', cacheRouter({ cache }));

	return apiRouter;
};
