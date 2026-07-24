import React from 'react'
import { Routes, Route  } from 'react-router'
import ProtectedRoute from './ProtectedRoute'
import LandingPage from '../pages/LandingPage'
import Register from '../pages/Register'
import Home from '../pages/Home'
import About from '../pages/About'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'


const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/home' element={
              <ProtectedRoute>
                 <Home/>
              </ProtectedRoute>
            }/>
            <Route path='/about' element={
              <ProtectedRoute>
                 <About/>
              </ProtectedRoute>
            }/>
            <Route path='/products' element={
              <ProtectedRoute>
                 <Products/>
              </ProtectedRoute>
            }/>

            <Route path='/shoppingcart/:id' element={
              <ProtectedRoute>
                 <ProductDetail/>
              </ProtectedRoute>
            }/>

             <Route path='/cart' element={
              <ProtectedRoute>
                 <Cart/>
              </ProtectedRoute>
            }/>

        </Routes>
    </div>
  )
}

export default AppRoutes