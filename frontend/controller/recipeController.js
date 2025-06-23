const Recipe=require('../models/recipeModel')


const multer=require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getAllRecipes=async(req,res)=>
{
    try{
        const recipes=await Recipe.find();
        return res.status(200).send({recipes:recipes});
    }
    catch(error)
    {
        console.error("Error in extracting all the recipes:",error.message);
        return res.status(500).send({message:"Failed to extract all the recipes"});
    }
}
const getRecipeById=async(req,res)=>
{
    const id=req.params.id;
    try{
        const getRecipe=await Recipe.findById(id);
        if(!getRecipe)
        {
            res.status(404).send({message:"Recipe not found"});
        }
        res.status(200).send(getRecipe);
    }
    catch(error)
    {
        console.error('Error in extracting the recipe by id:',error.message);
        res.status(500).send({message:'Error in getting the recipe by id'})
    }
}
const addRecipe=async(req,res)=>
{
    console.log(req.user)
    const title=req.body.title;
    const ingredients = req.body.ingredients;
    const steps=req.body.steps;
    const time=req.body.time;
    const photo=req.file.filename;
    const createdBy=req.user.id
    try{
        const newRecipe=new Recipe({title:title,ingredients:ingredients,steps:steps,time:time,photo:photo,createdBy:createdBy});
        const saveRecipe=await newRecipe.save();
        return res.status(201).send({newRecipe: saveRecipe});
    }
    catch(error)
    {
        console.error('Error in adding the recipe:',error.message);
        res.status(400).send({message:"Error in adding the recipe"})
    }
}
const updateRecipeById=async(req,res)=>
{
    const id=req.params.id;
    let recipe=await Recipe.findById(id)
    try{
        let photo=req.file?.filename ? req.file?.filemane: recipe.photo
        const updateRecipe=await Recipe.findByIdAndUpdate(id,{...req.body,photo},{new:true});
        if(!updateRecipe){
            res.status(404).send({message:"Error in updating the Recipe"});
        }
        res.status(200).send({updateRecipe:updateRecipe});
    }
    catch(error){
        console.error("Error in updating the recipe:",error.message);
        res.status(400).send({message:"Error in updating the recipe"});
    }
}
const deleteRecipeById=async(req,res)=>
{
    const id=req.params.id;
    try{
        const deleteRecipe=await Recipe.findByIdAndDelete(id);
        if(!deleteRecipe)
        {
            res.status(404).send({message:"Recipe not found"});
        }
        res.status(200).send({message:"Recipe deleted successfully"});
    }
    catch(error){
        console.error("Error in deleting the recipe");
        res.status(400).send({message:"Error in deleting the recipe"});
    }
}
module.exports={getAllRecipes,getRecipeById,addRecipe,updateRecipeById,deleteRecipeById,upload}