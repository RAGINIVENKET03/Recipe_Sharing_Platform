import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")

  const handleOnSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setError("Email and password are required.");
    return;
  }

  let endpoint = isSignUp ? "signup" : "login";
  try {
    const res = await axios.post(`http://localhost:3000/${endpoint}`, { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setIsOpen();
  } catch (err) {
    setError(err.response?.data?.error || "Server error");
  }
};

  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>email</label>
                <input type="email" className="input" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type="password" className="input" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit'>{(isSignUp) ? "Sign Up": "Login"}</button><br></br>
            {(error!="") && <h6 className='error'>{error}</h6>}<br></br>
            <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
        </form>
    </>
  )
}