import { Router } from 'express';
const cacheRouter = Router();
import { getKeywordFromAddress, cacheKeyGeneratorFromUrl } from '../lib/util';
import { getMoreMovies } from '../service/searchService';

export default ({ cache }) => {
  cacheRouter.get('/', (req, res) => {
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
