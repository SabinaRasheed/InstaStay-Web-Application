const express = require("express")
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js")
const reviewController = require("../Controller/reviews.js")


//review route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview));

module.exports=router;