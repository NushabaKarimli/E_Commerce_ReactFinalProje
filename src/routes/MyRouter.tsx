import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Card from '../pages/Card'
import Shop from '../pages/Shop'
import Error from '../pages/Error'
import Services from '../services/Services'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Wishlist from '../pages/wishlist';


const MyRouter = () => {
  return (
   <Routes>
    <Route path ="/" element={<Home/>}/>
    <Route path ="/card" element={<Card/>}/>
    <Route path ="/shop" element={<Shop/>}/>
    <Route path ="/shop/:id" element={<ProductDetail/>}/>
    <Route path ="/error" element={<Error/>}/>
    <Route path ="/services" element={<Services/>}/>
    <Route path="/wish" element={<Wishlist/>}/>
   </Routes>
  )
}

export default MyRouter