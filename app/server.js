const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
class RateLimiter {
  constructor(capacity, fill_per_second){
      this.capacity = capacity;
      this.tokens = capacity;
      setInterval(()=> this.addToken(), 1000 * 20/fill_per_second);
  }

  addToken(){
      if (this.tokens < this.capacity) {
          this.tokens += 1;
      }
  }
  removeToken(){
      if (this.tokens > 0) {
          this.tokens -= 1;
          return true;
      }
      return false;
  }
}

const api = express();

function limitRequests(perSecond, maxBurst) {
  const bucket = new RateLimiter(3,2);
  return function limitRequestsMiddleware(req, res, next) {
      if (bucket.removeToken()) {
          next();
      } else {
          res.status(429).send('Rate limit exceeded');
      }
  }
}
api.use(limitRequests(3,3));
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
 
const routes = require('./api/routes/serverRoutes');
routes(api);
api.use(function(req, res) {
  res.status(404).send({
    status: false,
    message: 'endpoint ' + req.originalUrl + ' not found'})
});
api.listen(port);

console.log('API Server Started on: ' + port);