const express=require("express");
const app=express();
const dotenv=require("dotenv").config()
const recipeRoute=require("./routes/recipeRoute")
const userRoute=require('./routes/userRoute')
const mongoConnection=require('./config/mongoDB')

const PORT=process.env.PORT || 3000;
mongoConnection()
const cors = require('cors')

app.use(express.static("public"))

app.use(cors())
app.use(express.json());
app.use("/",userRoute)
app.use("/recipe",recipeRoute);
app.listen(PORT,(err)=>{
    console.log(`Server is listening on port ${PORT}`)
})