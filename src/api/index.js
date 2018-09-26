import { version } from '../../package.json';
import { Router } from 'express';
import search from './search';

export default ({ config, db }) => {
	let api = Router();

	// Mount the facets resource
	api.use('/search', search({ config, db }));

	// Expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
