import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BlogCard} from '../components/BlogCard'
import { useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { serverURL } from '@/constant';
const Blogs = () => {
  
  const location = useLocation();
  const [search, setSearch] = useState("")
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async()=>{
    try {
      const {data} = await axios.get(`${serverURL}/blog/all-blogs/?search=${search}`)
      
      setBlogs(data.blogs)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
console.log(search)
  useEffect(()=>{
    getAllBlogs()
  },[search])
  return (
    <div>
      <div className='p-3'>
        <Input  className='py-2 px-3 w-50 border focus: border-gray-400' onChange={(e)=> setSearch(e.target.value)} value={search}/>
        
      </div>
      <div className='flex flex-wrap gap-5 justify-evenly p-5'>
      
       { blogs.map((blog, index)=>{
          return <BlogCard key={index} data= {blog}/>
          
        })}
      </div>
    </div>
  )
}

export default Blogs
