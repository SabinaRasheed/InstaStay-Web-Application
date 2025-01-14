const mongoose=require("mongoose");
const schema=mongoose.Schema;

const reviews=new schema({
    comment : String,
    ratings : {
        type : Number,
        min : 1,
        max :5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : schema.Types.ObjectId,
        ref : "User"
    }
})

const Review = mongoose.model("Review",reviews)
module.exports=Review