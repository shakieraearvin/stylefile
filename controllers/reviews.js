

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    res.render('reviews/index.ejs', {
      reviews: currentUser.reviews,
    });
  } catch (error) {


    res.redirect('/');
  }
});



router.get('/new', async (req, res) => {
  res.render('reviews/new.ejs');
});


router.post('/', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    currentUser.reviews.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/reviews`);
  } catch (error) {

  
    res.redirect('/');
  }
});


router.get('/:reviewId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    const review = currentUser.reviews.id(req.params.reviewId);

    res.render('reviews/show.ejs', {
      review: review,
    });
  } catch (error) {


    res.redirect('/');
  }
});


router.delete('/:reviewId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    currentUser.reviews.id(req.params.reviewId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/reviews`);
  } catch (error) {

    res.redirect('/');
  }
});


router.get('/:reviewId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const review = currentUser.reviews.id(req.params.reviewId);
    res.render('reviews/edit.ejs', {
      review: review,
    });
  } catch (error) {
    res.redirect('/');
  }
});



router.put('/:reviewId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    const review = currentUser.reviews.id(req.params.reviewId);

    review.set(req.body);

    await currentUser.save();

    res.redirect(
      `/users/${currentUser._id}/reviews/${req.params.reviewId}`
    );
  } catch (error) {

    res.redirect('/');
  }
});

router.get('/community/:userId/:reviewId', async (req, res) => {
  try {
    console.log(req.params)
    const communityUser = await User.findById(req.params.userId);
   
    const review = communityUser.reviews.id(req.params.reviewId);



    res.render('reviews/vip.ejs', {
      review: review,
    });
  } catch (error) {
    res.redirect('/');
  }
});


module.exports = router;
