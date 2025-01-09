import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import Trainers from '../pages/Trainers/Trainers'
import TrainerDetails from '../pages/Trainers/TrainerDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/trainer-account/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Profile from '../Dashboard/user-account/Profile'
import CheckoutSuccess from '../pages/Trainers/CheckoutSuccess'
import MyBookings from '../Dashboard/user-account/MyBookings'
import About from '../components/About'
import MoreAbout from '../components/MoreAbout'
import Blogs from '../components/Blogs'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/trainers' element={<Trainers/>} />
        <Route path='/trainers/:id' element={<TrainerDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/about' element={<MoreAbout/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/mybooking' element={<MyBookings/>} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>} />
        <Route path='/users/profile/me' element={ <ProtectedRoute allowedRoles={['trainee']}><MyAccount/></ProtectedRoute> } />
        <Route path='/trainers/profile/me' element={ <ProtectedRoute allowedRoles={['trainer']}><Dashboard/></ProtectedRoute> } />
    </Routes>
  )
}

export default Router