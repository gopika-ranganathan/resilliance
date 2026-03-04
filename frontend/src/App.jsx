import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRoute from './MainRoute'
import { AuthProvider } from './context/AuthContext'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoute />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
