const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

const app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

const mongoConnection = "mongodb+srv://ReadAny:1234@fp.yajwv4m.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoConnection, { useNewUrlParser: true });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

app.listen(port);
console.log('Server running on port ' + port);