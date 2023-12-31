import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Toaster } from './components/ui/toaster';
import Profile from './components/Profile';
// import Navbar from './components/Navbar';
// import { useEffect } from 'react';
import Landing from './components/Landing';
import Init from './hooks/Init';
import MainLayout from './layouts/Layout2';
import Home from './components/Home/Home';
function App() {
  // const navigate = useNavigate()
  return (
    <div className='h-full'>
      <Router>
        {/* <Navbar /> */}
        <Init />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/threads" element={<MainLayout><Home/></MainLayout>} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}


export default App
