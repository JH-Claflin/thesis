const express = require('express');
const router = express.Router();
const client = require('../db.js');


router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT DISTINCT ON(first_name, last_name) msi_type, classification, major, msipp_prog, national_lab FROM user_data ORDER BY first_name, last_name, id DESC');
        // console.log(result.rows) //=> Database Table
        // console.log(result.rowCount) // => Total amount of records
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    } finally {
        client.release;
    }
});

module.exports = router