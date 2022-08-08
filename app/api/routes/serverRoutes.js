'use strict';

module.exports = function (api) {
    var simpleAPI = require('../controllers/serverController');
    api.route('/howold/:dob')
        .get(simpleAPI.howOld);
}
