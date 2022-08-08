var express = require('express'),
  api = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

  //rate limiting bucket
  class TokenBucket{
    constructor(capacity, perSecond){
      this.capacity = capacity;
      this.tokens = capacity;
      setInterval(()=> this.putToken(), 1000*15/perSecond);
    }
    putToken(){
      if (this.tokens < this.capacity) {
        console.log("Token Added")
        this.tokens += 1;
      }
    }
    removeToken(){
      if (this.tokens > 0) {
        console.log("Token Removed")
        this.tokens -= 1;
        return true;
      }
      return false;
    }
  }
  //rate-limiting
  function rateLimiting() {
    const bucket = new TokenBucket(process.env.RATE_PER_SECOND, process.env.MAX_BURST);
    return function limitRequestsMiddleware(req,res,next) {
      if (bucket.take()) {
        next();
      }else{
        res.status(429).send("Rate limit Exceeded. Try again in a few minutes");
      }
    }
  }
  api.use(bodyParser.urlencoded({ extended: true }));
  api.use(bodyParser.json());
 
  var routes = require('./api/routes/serverRoutes');
  routes(api);
  api.use(function(req, res) {
    rateLimiting();
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
api.listen(port);

console.log('API Server Started on: ' + port);