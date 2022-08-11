const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const api = express();
const limit = rateLimit({
  windowMs: 1000,
  max: 3 
});
api.use(limit);
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
 
const routes = require('./api/routes/serverRoutes');
routes(api);
api.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
api.listen(port);

console.log('API Server Started on: ' + port);