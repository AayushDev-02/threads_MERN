import {  useNavigate } from 'react-router-dom'; // Use the appropriate router library
import { Button } from './ui/button';

const Navbar = () => {
  const navigate = useNavigate()
  const isLoggedIn = false
  return (
    <div className="flex fixed top-0 w-full border-b border-border justify-between items-center h-20  px-10 backdrop-blur-lg text-white z-50">
      
        <h1 onClick={() => {navigate("/")}} className="font-bold text-2xl cursor-pointer">Threads</h1>
      
      <div className="flex items-center justify-center">
        {isLoggedIn ? (
          <>
            <p className="mr-3">Hello, Aayush</p>
            <a href="/profile">Profile</a>
          </>
        ) : (
          <div className='space-x-2'>
            <Button onClick={() =>{ navigate('/auth/login')}} variant={'secondary'}>Login</Button>
            <Button onClick={() => {navigate('/auth/signup')}}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
