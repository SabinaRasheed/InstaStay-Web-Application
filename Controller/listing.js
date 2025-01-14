const Listing = require("../models/listing")

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;

        // Directly destructure from req.body
        const { title, description, image, price, location, country } = req.body;

        const newListing = new Listing({
            title,
            description,
            image,
            price,
            location,
            country,
        });

        newListing.image = { url, filename };
        newListing.owner = req.user._id;

        await newListing.save();
        
        req.flash("success", "New listing created successfully");
        console.log("New listing saved!");
        return res.redirect("/listings"); // Add return to ensure no further code runs after this
    } catch (err) {
        console.log("error occured while creating listing!")
        next(err); // Pass the error to the error handler
    }
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_25")

    res.render("listings/edit.ejs", { listing , originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("success", "Listing updated successfully")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
}