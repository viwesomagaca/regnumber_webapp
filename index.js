const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const flash = require('express-flash');
const session = require('express-session');
const Registrations = require('./models');
const RegNumbersRoutes = require("./regNumbers");

const registrations = Registrations(process.env.MONGO_DB_URL || "mongodb://localhost/registrationNumberPlates");
const regNumberRoutes = RegNumbersRoutes(registrations);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.engine('handlebars',exphbs({defaultLayout : 'main'}) );
app.set('view engine', 'handlebars');

app.use(session({
    secret:'keyboard cat',
    cookie: { maxAge: 60000 *30 },
    resave: true,
    saveUninitialized: true

}));
app.use(flash());

app.get("/",function(req,res){
    res.redirect("/registrationNumbers")
})
app.get("/registrationNumbers", regNumberRoutes.blank)
app.get("/registrationNumbers",regNumberRoutes.addNoPlate)
app.get("/registrationNumbers/filter", regNumberRoutes.filter)
app.get("/registrationNumbers/reset", regNumberRoutes.clear)
app.post("/registrationNumbers",regNumberRoutes.addNoPlate)
app.post("/registrationNumbers/filter", regNumberRoutes.filter)
app.post("/registrationNumbers/reset", regNumberRoutes.clear)

let portNumber =process.env.PORT || 3004;
app.listen(portNumber, function(){
    console.log('Web application started on port ' + portNumber);
});
