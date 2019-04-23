const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render(__dirname + '/../views/logged');
});


module.exports = router;