import React, { useState } from 'react'
import foodphoto from '../assets/foodcover.jpg'
import Items from '../components/Items'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../components/LoginModal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token){
            navigate("/addRecipe")
        }
        else{
            setIsOpen(true)
        }
    }

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Foodly Satisfying</h1>
                    <h5>Food is a beautiful blend of art and science, where ingredients, flavors, and techniques come together to create something delicious. Each dish tells a story, reflecting culture, creativity, and care in every bite.</h5>
                    <button onClick={addRecipe}>Share your magic</button>
                </div>
                <div className='right'>
                    <img src={foodphoto} width="320px" height="300px" alt='food picture'></img>
                </div>
            </section>
            <div className='bg'>
            </div>
            {(isOpen) && <LoginModal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></LoginModal>}
            <div className='recipe'>
                <Items/>
            </div>
        </>
    )
}