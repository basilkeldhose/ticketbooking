const mongoose = require("mongoose")
var User = mongoose.model('User', {
    name: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    phone: {
        type: Number
    }
});


module.exports =    { User }