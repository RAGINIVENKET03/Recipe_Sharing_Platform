const router=require("express").Router();
const {getAllRecipes,getRecipeById,addRecipe,updateRecipeById,deleteRecipeById,upload}=require("../controller/recipeController")
const verifyToken=require('../middleware/auth')


router.get("/",getAllRecipes) //get all the recipes
router.get("/:id",getRecipeById);//get the recipe by id 
router.post("/",upload.single('file'),verifyToken,addRecipe);//adding the recipe in the website
router.patch("/:id",upload.single('file'),updateRecipeById);//update the recipe for a particular id
router.delete("/:id",deleteRecipeById);//delete the recipe for a particular id

module.exports=router;