import React from 'react'
import './App.css'
import Login from "../src/Pages/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Authentication from "./Service/Authentication"
import Dashboard from "../src/Pages/Dashboard";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* <Route path='/' element={<Dashboard/>} /> */}
           {/* Protected route */}
          <Route element={<Authentication />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
        
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
