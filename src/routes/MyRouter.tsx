import { Route, Routes } from 'react-router-dom'
import Shop from '../pages/Shop'
import Services from '../services/Services'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Wishlist from '../pages/Wishlist'
import Card from '../pages/Card'

const MyRouter = () => {
  return (
   <Routes>
    <Route path ="/" element={<Home/>}/>
    <Route path ="/shop" element={<Shop/>}/>
    <Route path="/card" element={<Card/>}/>
    <Route path ="/shop/:id" element={<ProductDetail/>}/>
    <Route path ="/services" element={<Services/>}/>
    <Route path="/wish" element={<Wishlist/>}/>
   </Routes>
  )
}

export default MyRouter