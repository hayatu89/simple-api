'use strict';

module.exports = function (api) {
    var simpleAPI = require('../controllers/serverController');
    api.route('/howold')
        .get(simpleAPI.howOld);
}
