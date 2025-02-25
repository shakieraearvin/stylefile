

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//GET /users/:userId/reviews
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('reviews/index.ejs', {
      reviews: currentUser.reviews,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
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
    currentUser.reviews.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/reviews`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// GET /users/:userId/reviews/:reviewId SHOW PAGE
router.get('/:reviewId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const review = currentUser.reviews.id(req.params.reviewId);
    // Render the show view, passing the application data in the context object
    res.render('reviews/show.ejs', {
      review: review,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
