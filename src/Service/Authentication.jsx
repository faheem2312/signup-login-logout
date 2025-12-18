import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';
function Authentication() {
    const user =  JSON.parse(localStorage.getItem("currentUsers"));
    const isLoggedIn = !!user 
    console.log(user);
    console.log(isLoggedIn);
  return  isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>
}

export default Authentication