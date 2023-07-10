const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');



/**
 * ! Imporant Variables DO NOT DELETE 
 */


const app = express();
const port = 3000;
// let publicPath = path.join(__dirname, 'public');


/**
 *  Database connection with postgresql packages, the host, port, user, password, and databse can be change to match your config
 */

const client = new Client({
    host: "localhost",       
    port: 5432, 
    user: "postgres",
    password: "admin",
    database: "msipp_form"
});



/***
 * Middleware
*/

app.set("view engine", "ejs");

app.use(cors()); // Allow request from any IP

app.use(express.static(path.join(__dirname, 'public')));

const middle = express.urlencoded({ 
    extended: false,
    parameterLimit: 17
    
})


app.get('/success', (req, res) => {
    res.render("success", {title: "Thank you"});
})

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
    
    const userData = req.body;
    
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
        await client.connect();
        const check = await client.query(`SELECT * FROM user_data WHERE first_name=$1 AND last_name=$2 AND email=$3`, [firstName, lastName, email]);
        // console.log(check.rowCount + '<= validation');
        
        if(check.rowCount === 0) {
            const result = await client.query(`insert into user_data(first_name, last_name, email, res_state, res_zip, institution, ins_state, ins_zip, msi_type, sec_msi_type, classification, major, prin_investigator, msipp_prog, msipp_year_parti, national_lab)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, [firstName, lastName, email, resState, resZip, institution, insState, insZip, msiType, msiType2, classification, major, prinInvest, msipp, msippYear, lab]);
            // console.log(result.rowCount + '<= results');
        }
        
        client.end();
    }
    
    query();
    
    client.on("connect", () => {
            console.log("Database connection"); 
        })
        
    client.on("end", () => {
            console.log("Connection end");
        })


    res.redirect('/success');
});






app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})


