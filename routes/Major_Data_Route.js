const express = require('express');
const router = express.Router();
const client = require('../db.js');


router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT DISTINCT ON(major) major FROM user_data');
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