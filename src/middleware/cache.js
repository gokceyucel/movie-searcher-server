import mcache from 'memory-cache';

// FUNCTIONAL_REQUIREMENT_BACKEND_4
// FUNCTIONAL_REQUIREMENT_BACKEND_5
export default (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;
  let cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
    return;
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      mcache.put(key, body);
      res.sendResponse(body);
    }
    next();
  }
};
