const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema} = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}= require("../middleware.js");
const listingController= require("../controllers/listing.js");
// for image upload and save in cloudinary storage
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
.get( wrapAsync(listingController.index))
 .post(isLoggedin, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));


//new route  to create new listing
router.get("/new", isLoggedin, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedin, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedin, isOwner, wrapAsync(listingController.deleteListing));




// update route
router.get("/:id/edit",isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));




module.exports=router;