const mongoose=require("mongoose");
const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    steps:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
const Recipe=mongoose.model("recipes",recipeSchema)
module.exports=Recipe;