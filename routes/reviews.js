const express = require("express");
const router = express.Router({ mergeParams: true }); //express router like to keep params seperate, don't have access to id's in review routes. But we can specify an option mergeParams and set that to true. Now all the params in 'app.use("/campgrounds/:id/reviews", reviews);' file can merge alongside the params in this file
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
