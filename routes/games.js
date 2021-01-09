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
router.get('/', (req, res) => res.render('games'));
router.get('/tetris', (req, res) => res.render('tetris'));
router.get('/rockpaperscissors', (req, res) => res.render('rps'));
router.get('/snake', (req, res) => res.render('snake'));

module.exports = router;