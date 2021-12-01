const express = require('express');
const { model } = require('mongoose');
const app = express();
const router = express.Router();

router.get('/', function (req, res) {
    res.render('home')
});

module.exports = router;