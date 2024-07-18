// Import just the router express
const router = require('express').Router();


router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;
