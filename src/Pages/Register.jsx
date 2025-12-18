import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError]  = useState("")
    
    // to store data in localstorage
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        //check if user already exist or not
        const StoredUser = JSON.parse(localStorage.getItem("users")) || [] 
        
        //if exist then 
        const userExist = StoredUser.some((user) => user.email === email);
        if(userExist){
            setError("User Already Exist");
            return;
        }

        //add user to localstorage
        const newUser = {name,email,password}
        StoredUser.push(newUser)

        localStorage.setItem("users",JSON.stringify(StoredUser));

        setEmail("");
        setName("");
        setName("");
        setError("");
        alert("User Register Successfuly")
        navigate("/login")
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              required
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 

          <p className="text-red-600">{error}</p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to={'/login'}>
            <span className="text-blue-600">Login</span>
          </Link>
            
        </p>

        
      </div>
    </div>
  );
};

export default Register;
