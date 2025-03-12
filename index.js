const express = require('express');
const cors = require('cors');

const path = require('path');
require('dotenv').config()


/**
 * pulls data from the database and generates data visualization
 * the metrics that should be displayed are:
 * Types of MSIPP Programs, Which Labs, Type of Schools, Majors
 * 
 *  Classification, Lab, Major => Grouped Stacked Bar Chart
 *  Type of Institution Type, MSIPP Programs => Pie Chart
 *  Major => Drilldown Pie Chart
 *  
*/


/**
 *  Web App Configuration
*/

const app = express();
const port = process.env.APP_PORT || 3000;
const publicPath = path.join(__dirname, 'public');


/***
 * Middleware
*/

app.set("view engine", "ejs");
app.use(cors()); // Allow request from any IP
app.use(express.static(publicPath));

/**
 *  Page Routing Variables
 */

const dashboardRoute = require('./routes/Dashboard_Route');
const successRoute = require('./routes/Success_Route');
const errorRoute = require('./routes/Error_Route');
const submitRoute = require('./routes/Submit_Route');
const dataRoute = require('./routes/Data_Route');
const majorDataRoute = require('./routes/Major_Data_Route');

/**
 * Web Application Page Routing
 */

app.get('/', (req, res) => {
    res.render("index");
})

app.use('/success', successRoute);
app.use('/dashboard', dashboardRoute);
app.use('/submit', submitRoute);
app.use('/data', dataRoute);
app.use('/majors', majorDataRoute);
app.use('*', errorRoute);

/**
 * Web App Terminal Information
 */

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})
