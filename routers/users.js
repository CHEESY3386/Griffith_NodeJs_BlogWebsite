var express = require('express');

var router = express.Router();

router.get('/', () => {
    console.log('test')
});

module.exports = router;