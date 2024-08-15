const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema,reviewSchema} = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");

// to check the user is logged in or not
module.exports.isLoggedin=(req,res,next)=>{
// console.log(req.path, "..",req.originalUrl) 
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
} 

// to save the original url before user logged in 
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

// to check the user is owner of listing  or not
module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let listing= await  Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//to give validation in listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    //    console.log(result);
    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    }
}

//to give validation in reviews
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    //    console.log(result);
    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    }
}

//to check the user is author/owner of reviews or not 
module.exports.isReviewAuthor= async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let listing= await  Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}