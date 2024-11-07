const express = require('express');
const router = express.Router();


/**
 * Thank you page
 */

router.get('/', (req, res) => {
    res.render("success", {title: "Thank you"});
})


module.exports = router;