const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');
require('dotenv').config()



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

const middle = express.urlencoded({ 
    extended: false,
    parameterLimit: 17,
})

/**
 * Thank you page
 */

app.get('/success', (req, res) => {
    res.render("success", {title: "Thank you"});
})

/**
 * Dashboard Page
 */

app.get('/dashboard', (req, res) => {
    res.render("dashboard", {title: "Dashboard"});
});

/**
 * Custom error handling page 
 */

app.get("*", (req, res) => {
    res.render("404", {title: "404"}); 
});






/**
 * Form submission and communication between the database and node
*/

app.post('/submit', middle,(req, res) => {

    /**
     * 
     * Cleans information collected form the form and remove possible injection.
     * @function removeUnexpected
     * @param {string} formdata
     * @returns string
     * 
     */

    let removeUnexpected = (formdata) => {
        let data = formdata.replace(/[^a-zA-Z0-9 .]/g, '');
        return data;
    }
    
    const userData = req.body;

    Object.keys(userData).forEach((key, index) => {
        if (key != 'email') {
            userData[key] = removeUnexpected(userData[key]);
        }

        if(userData[key] != '' && typeof userData[key] == 'string'){
            userData[key] = userData[key].toUpperCase();
        }
    })
    
    const firstName = userData.fName;
    const lastName = userData.lName;
    const email = userData.email;
    const resState = userData.resState;
    const resZip = userData.resZip
    const institution = userData.institution;
    const insState = userData.insState;
    const insZip = userData.insZip;
    const msiType = userData.msiType;
    const msiType2 = userData.msiType2;
    const classification = userData.classification;
    const major = userData.major;
    const prinInvest = userData.prinInvest;
    const msipp = userData.msipp;
    const msippYear = parseInt(userData.msippYear);
    const lab = userData.lab; 
    
    
    
    const query = async () => {
    
        const check = await client.query(`SELECT * FROM user_data WHERE first_name=$1 AND last_name=$2 AND email=$3 AND msipp_year_parti=$4`, [firstName, lastName, email, msippYear]);
        // console.log(check.rowCount + '<= validation');
        
        if(check.rowCount === 0) {
            const result = await client.query(
                `insert into user_data(first_name, last_name, email, res_state, res_zip, institution, ins_state, ins_zip, msi_type, sec_msi_type, classification, major, prin_investigator, msipp_prog, msipp_year_parti, national_lab)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, 
            [firstName, lastName, email, resState, resZip, institution, insState, insZip, msiType, msiType2, classification, major, prinInvest, msipp, msippYear, lab]);
            // console.log(result.rowCount + '<= results');
        }
        
        // client.end();

    }
    
    query();
    
    
    
    res.redirect('/success');
});


client.on("connect", () => {
    console.log("Connection started");
})

    
client.on("end", () => {
    console.log("Connection end");
})


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})


