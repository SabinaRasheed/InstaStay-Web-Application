const mongoose=require("mongoose");
const schema =mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new schema({
    email :{
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose); // adds username, password , salt and hash automatically so we need to built form scratch

module.exports = mongoose.model("User",userSchema)