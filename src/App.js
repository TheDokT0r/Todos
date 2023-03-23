import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
