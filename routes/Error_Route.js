const express = require('express');
const router = express.Router();

/**
 * Custom error handling page 
 */

router.get("/", (req, res) => {
    res.render("404", {title: "404"}); 
});


module.exports = router;