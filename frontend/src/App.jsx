import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNav from './components/MainNav'
import axios from 'axios'
import { AddFoodRecipe } from './pages/AddFoodRecipe'
import Edit from './pages/Edit'
import RecipeDetails from './components/RecipeDetails'


const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('https://recipesharingapp-backend-theta.vercel.app/recipe').then(res => {
    allRecipes = res.data.recipes;
  })
  return allRecipes
}

const getMyRecipe=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainNav />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader: getAllRecipes,
        },
        {
          path:'/myRecipe',
          element: <Home/>,
          loader:getMyRecipe
        },
        {
          path:'/myFavourites',
          element:<Home/>,
          loader:getFavRecipes
        },
        {
          path:'/addRecipe',
          element:<AddFoodRecipe/>
        },
        {
          path:'/editRecipe/:id',
          element:<Edit/>
        },
        {
          path:'/recipe-details/:id',
          element: <RecipeDetails/>
        }
      ],
    },
  ],
  {
    hydrateFallbackElement: <div>Loading...</div>,
  }
)


export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
