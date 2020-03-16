var express = require('express');
var router = express.Router();
const fs = require('fs')
router.get('/', function (req, res, next) {
    fs.readFile('C:/Users/neetu/Downloads/test.txt', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        res.send(data);
    })
});

module.exports = router; 