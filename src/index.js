const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const siteRouter = require('./sources/routes/siteRoute.js');
const todoRouter = require('./sources/routes/todoRoute.js');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.engine('hbs', handlebars({extname: ".hbs"}));
app.set('view engine', 'hbs');

app.use(morgan('combined'));

mongoose.connect('mongodb+srv://nhakhuyen:nhakhuyen@cluster0.vgmzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {console.log('connect successfully' ) })
.catch(err => {console.log('connect fail')});

app.use('/', siteRouter);
app.use('/todo', todoRouter);

app.set('views', path.join(__dirname, './sources/views'))

app.listen(3000);

