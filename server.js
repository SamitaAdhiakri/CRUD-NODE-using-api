const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
dotenv.config({ path: 'config.env'})
const PORT = process.env.PORT || 5000

//mongodb connection
const connectDB = require('./server/database/connection')

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//load asset
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")))

app.use(express.static(path.join(__dirname, 'assets')));



//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => console.log("Server is running in 3000"));