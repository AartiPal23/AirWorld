const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../Schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedin,isReviewAuthor}= require("../middleware.js");

const listingController= require("../controllers/review.js");


//post route to create reviews
 router.post("/", isLoggedin, validateReview,wrapAsync(listingController.createReview));

 
 //post route to delete reviews
 router.delete("/:reviewId",isLoggedin, isReviewAuthor,wrapAsync(listingController.deleteReview));

 module.exports=router;


 
