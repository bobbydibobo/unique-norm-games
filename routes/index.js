/*--------------------
BIND DEPENDENCIES
---------------------*/
const express = require('express');

/*--------------------
INIT EXPRESS ROUTER
---------------------*/
const router = express.Router();

/*--------------------
ROUTES
---------------------*/
router.get('/', (req, res) => res.render('home'));

module.exports = router;