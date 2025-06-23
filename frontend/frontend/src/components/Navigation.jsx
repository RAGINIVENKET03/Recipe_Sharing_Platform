import React, { useEffect, useState } from 'react'
import LoginModal from './LoginModal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

export default function Navigation(){
    const [isOpen,setIsOpen]=useState(false)
    let token=localStorage.getItem("token")
    const [isLogin,setIsLogin]=useState(token?false:true)
    let user=JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        setIsLogin(token?false:true)
    },[token])
    const checkLogin=()=>{
        if(token){
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            setIsLogin(true)
        }
        else{
            setIsOpen(true)
        }
    }
    return(
        <>
            <header>
                <h2>Foodly Satisfying</h2>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={!isLogin?"/myRecipe":'/'}>My Recipe</NavLink></li>
                    <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={!isLogin?"/myFavourites":'/'}>My Favourite Collection</NavLink></li>
                    <li onClick={checkLogin}><p className='login'>{(isLogin)?"Login":"Logout "}{user?.email ? `(${user?.email})` : ""}</p></li>
                </ul>
            </header>
            {(isOpen) && <LoginModal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></LoginModal>}
        </>
    )
}