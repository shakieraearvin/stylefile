

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


module.exports = router;
