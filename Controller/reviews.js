const Listing = require("../models/listing")
const Review  = require("../models/reviews")

module.exports.createReview = async (req, res) => {
    try {
        const { id } = req.params; // Extract the listing ID
        const listing = await Listing.findById(id); // Find the listing by ID

        if (!listing) {
            return res.status(404).send("Listing not found!");
        }

        // Create and save the new review
        const review = new Review({
            ratings: req.body.review.rating,
            comment: req.body.review.comment,
        });

        review.author=req.user._id
        await review.save();

        // Push the review's ID into the listing's reviews array
        listing.reviews.push(review._id);
        await listing.save();

        console.log("Review saved successfully:", review);
        req.flash("success","Review added successfully")
        res.redirect(`/listings/${id}`); // Redirect back to the listing page
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).send("Internal Server Error");
        
    }
}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    console.log(`Deleting review with ID: ${reviewId} for listing with ID: ${id}`);
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully")
    res.redirect(`/listings/${id}`);
}