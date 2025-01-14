if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const mehtodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")
const session = require("express-session")
const mongoStore = require("connect-mongo")
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { register } = require("module");

const DB_URL = process.env.ATLAS_URL;

const store = mongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", (err) => {
    console.log("ERROR in mongo session store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  // Fixed typo
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

const port = 5003;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(mehtodOverride("_method"))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")))

// Connect to MongoDB
// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/InstaStay');
// }


async function main() {
    await mongoose.connect(DB_URL);
}

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
    });


app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate())); //first need to configure

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)


app.all("*", (req, res, next) => {
    throw new ExpressError(404, "Page not found!")
})

app.use((err, req, res, next) => {
    let { statusCode = 500, msg = "Something went wrong" } = err; // if no value is assigned to the
    res.status(statusCode).render("error.ejs", { msg })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
