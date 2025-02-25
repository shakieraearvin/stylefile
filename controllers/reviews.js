

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//GET /users/:userId/reviews
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // reviews as data in the context object.
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
    // reviews array of the current user
    currentUser.reviews.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the reviews index view
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
    // Find the review by the reviewId supplied from req.params
    const review = currentUser.reviews.id(req.params.reviewId);
    // Render the show view, passing the review data in the context object
    res.render('reviews/show.ejs', {
      review: review,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// DELETE Route 
router.delete('/:reviewId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // a review using the id supplied from req.params
    currentUser.reviews.id(req.params.reviewId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the reviews index view
    res.redirect(`/users/${currentUser._id}/reviews`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// EDIT Route
router.get('/:reviewId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const review = currentUser.reviews.id(req.params.reviewId);
    res.render('reviews/edit.ejs', {
      review: review,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// UPDATE Route

router.put('/:reviewId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current review from the id supplied by req.params
    const review = currentUser.reviews.id(req.params.reviewId);
    // Use the Mongoose .set() method
    // this method updates the current review to reflect the new form
    // data on `req.body`
    review.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current review
    res.redirect(
      `/users/${currentUser._id}/reviews/${req.params.reviewId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
