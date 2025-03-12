import React, { useState } from 'react';
import {  ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

    
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const userData = {email,password}
    if(!email || !password){
        alert("Please Fill All Fields..")
    }   
console.log(userData)
    try {

        const result = await axios.post("https://reqres.in/api/login" , userData)
        console.log(result.data)
        let token = result.data
        alert("Login SuccessFully...")
        localStorage.setItem("userData",JSON.stringify(userData))
        localStorage.setItem("token",JSON.stringify(token))
        setTimeout(()=>{
            navigate("/")
        },1000)
    } catch (error) {
        console.log("error", error)
    }
  }

  
//   const togglePasswordVisibility = (userData) => {
//     setShowPassword(!showPassword);
//   };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-blue-100 mt-1">Please enter your details to sign in</p>
          </div>
          
          <div className="p-6 sm:p-8">
          
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Use this email - eve.holt@reqres.in"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  
                </div>
              </div>
              
              <div className="flex items-center justify-between">
               
               
                
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <ArrowRight size={18} className="mr-2" />
                  )}
                  Sign in
                </button>
              </div>
            </form>
            
           
            
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;