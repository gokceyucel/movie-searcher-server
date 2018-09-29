import mcache from 'memory-cache';
import { cacheKeyGeneratorFromUrl } from '../lib/util';

// FUNCTIONAL_REQUIREMENT_BACKEND_4
// FUNCTIONAL_REQUIREMENT_BACKEND_5
export default {
  cache: (req, res, next) => {
    const cacheKey = cacheKeyGeneratorFromUrl(req.originalUrl || req.url);
    const cachedBody = mcache.get(cacheKey);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      // Keep a reference of original json response function
      res.sendResponse = res.json;

      // Modify it
      res.json = (body) => {
        mcache.put(cacheKey, body);
        res.sendResponse(body);
      };

      // Pass response
      next();
    }
  },
  instance: mcache
};
