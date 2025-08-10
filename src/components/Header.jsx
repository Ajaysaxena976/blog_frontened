import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {store} from '../redux/store'
import { setIsLogout } from '../redux/features/authSlice'
const Header = () => {
    const navigate = useNavigate();
    const handleNavigateLogin = ()=>{
        navigate('/login')
    }
    const handleNavigateRegister= ()=>{
        navigate('/register')
    }
    const dispatch = useDispatch()
    const handleLogout= ()=>{
      localStorage.removeItem("isLogin")
      localStorage.removeItem("user")
      dispatch(setIsLogout())
      navigate("/login")
    }
    const isLogin = useSelector((state)=>{  
      console.log(state.auth.isLogin)
     return state.auth.isLogin
    })
    
     const user = JSON.parse(localStorage.getItem("user"))
    
    const addBlog =()=>{
      navigate('/add-blog')
    }

  return (
    <div>
        {/* navcontainer */}
      <div className='flex justify-between bg-blue-700 px-6 py-4'>
        {/* left */}
        <div className='text-white text-3xl font-bold'>My Blog App</div>
        {/* mid */}
        {isLogin && (
          <div className='flex justify-between gap-7'>
            <div className='text-white text-3xl font-bold cursor-pointer' onClick={()=>navigate('/')}>Blogs</div>
            <div className='text-white text-3xl font-bold cursor-pointer' onClick={()=>navigate('/my-blogs')}>My Blogs</div>
             <div onClick={addBlog}  className='text-white cursor-pointer text-3xl font-bold'>Add Blogs</div>
        </div>
        )
        
        }
        {/* right*/}
        <div className='flex justify-between gap-7'>
          {
            !isLogin && (
             <div className='flex justify-between gap-7'>
                 <div  className='text-white font-bold' onClick = {()=>handleNavigateLogin()
            }>Login</div>
            <div className='text-white font-bold' onClick={handleNavigateRegister}>Register</div>
             </div>
            )
          }
           {
            isLogin && (
               <div className='text-white font-bold'onClick={handleLogout}>Logout</div>
            )
           }
        </div>
      </div>
      
    </div>
  )
}

export default Header
