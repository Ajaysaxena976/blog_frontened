import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import {Routes, Route}  from 'react-router-dom'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import AddBlog from './components/AddBlog'
import Myblog from './components/Myblog'
function App() {
  

  return (
    <>
    <Header/>
    <Toaster/>
   <Routes >
    <Route path='/' element={<Blogs/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
     <Route path='/add-blog' element={<AddBlog/>}/>
     <Route path='/my-blogs' element={<Myblog/>}/>
   </Routes></>

  )}

export default App
