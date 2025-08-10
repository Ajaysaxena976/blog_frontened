import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast'
import { serverURL } from '@/constant';
const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(name, value);
    console.log(data);
  };
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(data)
    try{
      const response = await axios.post(`${serverURL}/user/register`, data)
      console.log(response)
      toast.success(response.message)
    }
    catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center   md:h-screen mt-20 md:mt-0  px-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md px-6  border-solid border-[2px] py-5 border-gray-300">
        {/* Username Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={data.username}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter E-mail"
            value={data.email}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={data.password}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className='bg-blue-700 px-5 w-full text-white py-3'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
