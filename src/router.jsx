import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Country from './pages/Country.jsx'
import Benchmarks from './pages/Benchmarks.jsx'
export default function Router(){
  return (<Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/country/:code' element={<Country/>} />
    <Route path='/benchmarks' element={<Benchmarks/>} />
  </Routes>)
}
