

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//GET /users/:userId/reviews
router.get('/', (req, res) => {
  try {
    res.render('reviews/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
  });
  
//GET /users/:userId/reviews/new
router.get('/new', async (req, res) => {
  res.render('reviews/new.ejs');
});

//POST /users/:userId/reviews
router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.applications.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
