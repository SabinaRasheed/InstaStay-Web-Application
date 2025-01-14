const User = require("../models/user.js");

module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signup = async (req, res) => {

    try{
    let { email, username, password } = req.body;
    const newUser = new User({ email, username })

    let registeredUser = await User.register(newUser, password)
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next()
        }
        req.flash("success","user registered successfully")
        res.redirect("/listings")
    })

}catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
}
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.Login = async(req,res)=>{
    req.flash("success","Welcome to InstaStay! now your are logged in successfully")
    let redirect = res.locals.redirectUrl || "/listings"  
    res.redirect(redirect)
}

module.exports.Logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out")
        res.redirect("/listings")
    })
}