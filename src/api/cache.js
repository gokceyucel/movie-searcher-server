import { Router } from 'express';
const cacheRouter = Router();
import { getKeywordFromAddress } from '../lib/util';
import { getMoreMovies } from '../service/searchService';

export default ({ cache }) => {
  cacheRouter.get('/refresh', (req, res) => {

    // FUNCTIONAL_REQUIREMENT_BACKEND_7i
    cache.instance
      .keys()
      .map(key => {
        const keyword = getKeywordFromAddress(key);
        const movies = getMoreMovies(keyword);
        cache.instance.del(key);
        cache.instance.put(key, movies);
      });

    res.send('Cache refreshed');
  });

  return cacheRouter;
};
