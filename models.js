const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const dbregplates = mongoose.model('dbregplates', {
        numberplates: String

    })

    return {
        dbregplates
    };
}
