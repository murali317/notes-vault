import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home' // page components
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import NotesDashboard from './pages/NotesDashboard'

function App() {
  return (
    <>
      <Navbar /> {/* it stays persistent across pages, and only the route content changes if outside Routes */}
      <Routes>
        <Route path='/' element={<Home />} /> {/*element is the React component rendered at that path */} 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/notes' element={<NotesDashboard />} />
      </Routes>
    </>
  )
}

export default App;
