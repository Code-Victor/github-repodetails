import { useState } from 'react'
import { AuthProvider, useFirebaseApp } from 'reactfire'
import {getAuth} from 'firebase/auth'
import {Routes,Route} from 'react-router-dom'
import {Home,Login,Four04} from './pages'
import { NavBar } from './components'

function App() {
  const app= useFirebaseApp()
  const auth= getAuth(app)
  return (
    <AuthProvider sdk={auth}>
      <NavBar/>
      <Routes>
        <Route path="*" element={<Four04 />} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
