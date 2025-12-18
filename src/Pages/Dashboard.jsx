import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const[editName,setEditName] = useState(false);
    const[editEmail,setEditEmail] = useState(false);
    const[editPassword,setEditPassword] = useState(false);

    let currentUser = JSON.parse(localStorage.getItem("currentUsers")) || {} ;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    

    const handleSave = ()=>{
        let update=false;
        try {
            //edit user name
            if(name && currentUser.name !== name){
                //edit current user
                currentUser.name = name;
                localStorage.setItem('currentUsers',JSON.stringify(currentUser))

                //edit main users
                const updatedUser = users.map((user)=>
                    user.email === currentUser.email ? {...user,name:name} : user
                )
                
                //save in localStorage
                localStorage.setItem('users',JSON.stringify(updatedUser))

                setEditName(false)
                setName("")
                alert("Name updated successfully!");
                update=true;
                
            }

            //edit user email
            if(email && currentUser.email !== email){
                //check is new email id already exist or not
                const userExist = users.find((user) => user.email === email)
                
                if(!userExist){
                    //edit main users
                    const updatedUser = users.map((user)=>
                        user.email === currentUser.email ? {...user,email:email} : user
                    )

                    //save in localStorage
                    localStorage.setItem('users',JSON.stringify(updatedUser))

                    //edit current user
                    currentUser.email = email;
                    //save in localStorage
                    localStorage.setItem('currentUsers',JSON.stringify(currentUser))

                    setEditEmail(false)
                    setEmail("")
                    update=true;
                    alert("Email updated successfully!");
                    
                }else{
                    alert("user already exist")
                }
                
            }

            //edit password
            if( password){
                //edit current user
                currentUser.password = password;
                localStorage.setItem('currentUsers',JSON.stringify(currentUser))

                //edit main users
                const updatedUser = users.map((user)=>
                    user.email === currentUser.email ? {...user,password:password} : user
                )

                //save in localStorage
                localStorage.setItem('users',JSON.stringify(updatedUser))

                setEditPassword(false)
                setPassword("")
                alert("Password updated successfully!");
                update=true;
                
            }
            if (!update) {
                alert("Please enter a valid new name, email, or password!")
            }

        } catch (error) {
            console.log(error);
            alert(" Something went wrong while updating user info!");
            
        }
        
    }

    const handleLogout = ()=>{
        localStorage.removeItem("currentUsers")
        navigate('/login')
        
    }
    const handleDelete = ()=>{
        const updatedList = users.filter((user) => user.email !== currentUser.email)
        localStorage.setItem("users",JSON.stringify(updatedList))
        localStorage.removeItem("currentUsers")
        navigate("/register")
    }


    
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 w-full max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Welcome Back, <span className="text-indigo-600">{currentUser.name}</span>
            </h1>
            <p className="text-gray-500 mb-8">Manage your personal information below</p>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                {editName ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Enter new name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <div className="flex gap-2">
                            <button
                            onClick={() => setEditName(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                            Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <p className="text-gray-800">{currentUser.name}</p>
                        <button
                        onClick={() => setEditName(true)}
                        className="text-indigo-600 hover:underline"
                        >
                        Edit
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                {editEmail ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter new email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <div className="flex gap-2">
                            <button
                            onClick={() => setEditEmail(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                            Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <p className="text-gray-800">{currentUser.email}</p>
                        <button
                            onClick={() => setEditEmail(true)}
                            className="text-indigo-600 hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                {editPassword ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <div className="flex gap-2">
                            <button
                            onClick={() => setEditPassword(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                            Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <p className="text-gray-800">••••••••</p>
                        <button
                            onClick={() => setEditPassword(true)}
                            className="text-indigo-600 hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={handleLogout} className="w-full sm:w-1/2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Log Out
                    </button>
                    <button onClick={handleDelete} className="w-full sm:w-1/2 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                        Delete Account
                    </button>
                </div>
        </div>
    </div>

  )
}

export default Dashboard