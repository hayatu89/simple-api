"use strict";

module.exports = function (api) {
    const simpleAPI = require('../controllers/serverController');
    api.route('/howold').get(simpleAPI.howOld);
}
