/*--------------------
BIND DEPENDENCIES
---------------------*/
const express = require('express');
//const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

/*--------------------
INIT EXPRESS
---------------------*/
const app = express();

/*--------------------
DB CONFIG
---------------------*/
//const connectString = require('.config/keys').MongoURI;

/*--------------------
DB CONNECT
---------------------*/
//mongoose.connect(connectString, {useNewUrlParser: true, useUnifiedTopology: true})
//.then(() => console.log('Successfully connected to Mongo DB'))
//.catch(err => console.log(err));

/*--------------------
MIDDLEWARE
---------------------*/
//Express Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

/*--------------------
INIT ROUTES
---------------------*/
app.use('/', require('./routes/index'));
app.use('/games', require('./routes/games'));
app.use('/skills', require('./routes/skills'));

/*-------------------------------
INIT STATIC FOLDERS -> Public
-------------------------------*/
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

console.log(__dirname);

/*--------------------
INIT SERVER PORT
---------------------*/
// Port is the processing envirorment in case of deployment
// Else 5000 on localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Successfully connected to PORT ${PORT}`));