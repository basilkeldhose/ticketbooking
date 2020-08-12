const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Crud", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, (err) => {
    if (!err) {
        console.log("mongodb connection sucessfull");
    }
    else {
        console.log("error in database connection" + JSON.stringify(err, undefined, 2));
    }
})



module.exports = mongoose