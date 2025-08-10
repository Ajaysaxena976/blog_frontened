import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { setIsLogin } from '../redux/features/authSlice'
import { serverURL } from '@/constant'
const Login = () => {
 const dispatch =  useDispatch()
  const navigate = useNavigate()
  const {isLogin} =useSelector((state)=>state.auth)
   console.log("this is is login value", isLogin)
   useEffect(
    ()=>{
      if(isLogin){
    navigate("/")
   }
    },[]
   )
  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    console.log("this is event e:-----", e)
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })



  }
  console.log("this is final entered dta", data.email, data.password)

  const handleSubmit = async () => {
    try {
      const { data: apiData } = await axios.post(`${serverURL}/user/login`, data)
      dispatch(setIsLogin())
      localStorage.setItem(
        "isLogin", "true"
      )
      console.log()
      localStorage.setItem(
        "user", JSON.stringify(apiData.user)
      )
      toast.success(apiData?.message || "success")
      navigate("/")
    } catch (error) {
      console.log(error)

    }
  }

  console.log("after handleSubmit")
  return (
    <div>
      {/* container */}
      <div className='flex  flex-col gap-5 justify-center items-center h-screen'>
        <div className='text-2xl font-bold'>LOGIN</div>
        <div>
          <input type="text" placeholder='email' name='email' value={data.email} onChange={handleChange} className='bg-gray-300 border-gray-700 border-solid border-[1px] pl-1 px-20 py-2' />
        </div>
        <div> <input type="text" placeholder='password' name='password' value={data.password} onChange={handleChange} className='bg-gray-300 border-gray-700 border-solid border-[1px] pl-1 px-20 py-2' /></div>
        <div>
          <button className='bg-green-500 rounded  px-10 py-3' onClick={handleSubmit}>Submit</button>

        </div>
      </div>
    </div>
  )
}

export default Login
