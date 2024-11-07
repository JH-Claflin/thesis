const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');
require('dotenv').config()


/**
 *  Page Routing Variables
 */
const dashboardRoute = require('./routes/Dashboard_Route');
const successRoute = require('./routes/Success_Route');
const errorRoute = require('./routes/Error_Route');
const submitRoute = require('./routes/Submit_Route');



/**
 * ! Imporant Variables DO NOT DELETE 
 */


const app = express();
const port = process.env.APP_PORT || 3000;
const publicPath = path.join(__dirname, 'public');


/**
 *  Database connection with postgresql packages, the host, port, user, password, and databse can be change to match your config
 */

const client = new Client({
    host: process.env.DB_HOST,       
    port: process.env.DB_PORT || 5432, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();


/***
 * Middleware
*/

app.set("view engine", "ejs");

app.use(cors()); // Allow request from any IP

app.use(express.static(publicPath));


/**
 * Page Routings
*/

app.get('/', (req, res) => {
    res.render("index");
})

app.use('/success', successRoute);
app.use('/dashboard', dashboardRoute);
app.use('/submit', submitRoute);
app.use('*', errorRoute);


client.on("connect", () => {
    console.log("Connection started");
})

    
client.on("end", () => {
    console.log("Connection end");
})


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})


