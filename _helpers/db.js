const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect("mongodb://username:password@ds249092.mlab.com:49092/ipec");
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Complain: require('../complains/complain.model')

};