import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Toaster } from './components/ui/toaster';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import Landing from './components/Landing';
function App() {

  useEffect(() => {
    
  })
  return (
    <div className='h-full'>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
