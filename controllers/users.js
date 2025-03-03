const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', { users: allUsers });
    } catch (error) {
     
        res.redirect('/');
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        res.render('users/show.ejs', { user, reviews: user.reviews });
    } catch (error) {
      
        res.redirect('/');
    }
});



module.exports = router;