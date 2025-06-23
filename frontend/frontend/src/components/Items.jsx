import React,{useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom"
import { CiStopwatch } from "react-icons/ci";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Items(){
    const recipe = useLoaderData()
    const [allRecipes, setAllRecipes]=useState()
    const recipes = Array.isArray(recipe) ? recipe : []
    let path=window.location.pathname==="/myRecipe" ? true : false
    let favItems=JSON.parse(localStorage.getItem("fav"))??[]
    const [isFavRecipe,setIsFavRecipe]=useState(false)

    useEffect(()=>{
        setAllRecipes(recipe)
    },[recipe])

    const onDelete=async(id)=>{
        await axios.delete(`http://localhost:3000/recipe/${id}`)
        .then((res)=>console.log(res))
        setAllRecipes(recipe=>recipe.filter(recipes=>recipes._id!==id))
        let filterItem=favItems.filter(recipes=>recipes._id !== id)
        localStorage.setItem("fav",JSON.stringify(filterItem))
    }

    const myFav=(item)=>{
        let filterItem=favItems.filter(recipes=>recipes._id !== item._id)
        favItems=favItems.filter(recipes=>recipes._id === item._id).length===0 ? [...favItems,item]: filterItem
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavRecipe(pre=>!pre)
    }

    return(
        <>
        <div className="card-container">
        {
            recipes?.map((item,index)=>{
                console.log("Recipe ID:", item._id);
                return(
                    <div key={index} className="card">
                        <Link to={`/recipe-details/${item._id.toString()}`}><img src={`http://localhost:3000/images/${item.photo}`} width="120px" height="100px" alt="food" /></Link>
                        <div className="card-body">
                            <div className="title">{item.title}</div>
                            <div className="icons">
                                <div className="timer"><CiStopwatch />{item.time}</div>
                                {(!path)?<FaHeartCircleCheck onClick={()=>myFav(item)}
                                    style={{color:(favItems.some(res=>res._id === item._id)) ? "red":""}}/>:
                                    <div className="action">
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><CiEdit/></Link>
                                        <RiDeleteBin6Line onClick={()=>{onDelete(item._id)}} className="deleteIcon" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
        </>
    )
}