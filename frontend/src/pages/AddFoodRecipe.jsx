import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AddFoodRecipe=()=>{
    const [recipeData,setRecipeData]=useState({})
    const navigate=useNavigate()

    const onHandleChange=(e)=>{
        let val=(e.target.name==="ingredients") ? e.target.value.split(","):(e.target.name==="file")?e.target.files[0]:e.target.value
        setRecipeData(pre=>({...pre,[e.target.name]:val}))
    }

    const onHandleSubmit=async(e)=>{
        e.preventDefault()
        console.log(recipeData)
        await axios.post("https://recipesharingapp-backend-theta.vercel.app/recipe",recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
        .then(()=>navigate("/"))
    }

    return(
        <>
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name='title' onChange={onHandleChange} />
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea name="ingredients" type="text" className='input-textarea' rows='5' onChange={onHandleChange}></textarea>
                </div>
                <div className='form-control'>
                    <label>Steps</label>
                    <textarea name="steps" type="text" className='input-textarea' rows='5' onChange={onHandleChange}></textarea>
                </div>
                <div className='form-control'>
                    <label>Preparation Time</label>
                    <input type="text" className='input' name='time' onChange={onHandleChange} />
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name='file' onChange={onHandleChange}/>
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
        </>
    )
}