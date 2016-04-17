var express       = require('express');
var path          = require('path');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var moment		  = require('moment');
var compression   = require('compression');
var morgan        = require('morgan');
var app           = express();
require('dotenv').config();

// functions ==============================================================
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('dev'));

// configuration ==========================================================
mongoose.connect(process.env.mongoURL); // connect to our database

// Main and Static Routes =================================================
app.get("/",function(req,res){
  res.render("index.html");
});

/**
 * Send the server route to a fake route to be handled by AngularJS.
 */
var sendIndex = function(req, res){
    return res.sendFile(__dirname + '/public/index.html');
};

app.route('/about').get(sendIndex);
app.route('/help').get(sendIndex);
app.route('/contact').get(sendIndex);
app.route('/termsAndConditions').get(sendIndex);
app.route('/privacypolicy').get(sendIndex);

app.route('/bookAFlight').get(sendIndex);
app.route('/offers').get(sendIndex);
app.route('/pricing').get(sendIndex);
app.route('/error').get(sendIndex);

// DB and API Routes  =====================================================
var dbRouter = require('./app/routes/db');
var APIRouter = require('./app/routes/api');

app.use('/db', dbRouter);               //DON'T DEPOLY
app.use('/api', APIRouter);

// 404 Middleware =========================================================
app.use(function(req, res, next){
    res.status(404);
    res.send('404 Not Found');
});

module.exports = app;
