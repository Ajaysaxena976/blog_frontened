import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BlogCard} from '../components/BlogCard'
import {  useLocation, useNavigate } from 'react-router-dom';
import { serverURL } from '@/constant';

const Myblog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = localStorage.getItem("_id");
  if(!id){
    return <div>
        <div>NOt Authenticated</div>
        <button onClick={()=> navigate('/login')}>Login</button>
    </div>
  }
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async()=>{
    try {
      const {data} = await axios.get(`${serverURL}/blog/user-blog/${id}`)
      
      setBlogs(data.blogs)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    getAllBlogs()
  },[])
  return (
    <div>
      <div className='flex justify-center flex-col gap-4 items-center border-2 rounded'>
      
       { blogs.map((blog, index)=>{
          return <BlogCard key={index} data= {blog}/>
          
        })}
      </div>
    </div>
  )
}

export default Myblog