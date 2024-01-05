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
import MainLayout from './layouts/MainLayout';
import Home from './components/Home/Home';
import AuthLayout from './layouts/AuthLayout';
import Settings from './components/Settings/Settings';
import ProfilePage from './components/Home/Profile/ProfilePage';
import Search from './components/Search/Search';
function App() {
  // const navigate = useNavigate()
  return (
    <div className='h-full'>
      <Router>
        {/* <Navbar /> */}
        <Init />
        <Routes>
          <Route path="/" element={<AuthLayout><Landing /></AuthLayout>} />
          <Route path="/auth/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
          <Route path="/auth/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/create-profile" element={<AuthLayout><Profile /></AuthLayout>} />
          <Route path="/threads" element={<MainLayout><Home/></MainLayout>} />
          <Route path="/search" element={<MainLayout><Search/></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings/></MainLayout>} />
          <Route path="/profile/:id" element={<MainLayout><ProfilePage/></MainLayout>} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}


export default App
