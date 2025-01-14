const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js")
const { listingSchema , reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
 

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please log in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirect=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}

// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to perform this action.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Validation middleware for listings
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map((e) => e.message).join(", ");
        throw new ExpressError(400, errorMsg);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.error("Validation error:", error.details);
        throw new ExpressError(400, error.details.map(e => e.message).join(", "));
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.extractUrl = ((req, res, next) => {
    res.locals.currentUrl = req.originalUrl.split("?")[0]; 
    next();
});
