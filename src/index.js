
// install PACKAGE
const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const slug = require('mongoose-slug-generator');
const methodOverride = require('method-override')

//FORM_METHOD
app.use(methodOverride('_method'));

// install PATH
const siteRouter = require('./sources/routes/siteRoute.js');
const todoRouter = require('./sources/routes/todoRoute.js');

// SLUG
mongoose.plugin(slug);

// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// HANDLE-BARS
app.engine('hbs', handlebars({extname: ".hbs"}));
app.set('view engine', 'hbs');

// MORGAN
app.use(morgan('combined'));

// CONNECT MONGODB
mongoose.connect('mongodb+srv://nhakhuyen:nhakhuyen@cluster0.vgmzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {console.log('connect successfully' ) })
.catch(err => {console.log('connect fail')});

// NEW-PATH
app.set('views', path.join(__dirname, './sources/views'))

// define PATH
app.use('/', siteRouter);
app.use('/todo', todoRouter);


app.listen(3000);

