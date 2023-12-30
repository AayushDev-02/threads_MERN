import {  useNavigate } from 'react-router-dom'; // Use the appropriate router library
import { Button } from './ui/button';
import { ModeToggle } from './ui/modeToggler';
import { useTheme } from './theme-provider';

const Navbar = () => {
  const navigate = useNavigate()
  const {theme} = useTheme()
  const isLoggedIn = false
  return (
    <div className={`flex fixed top-0 w-full border-b border-border justify-between items-center h-20  px-10 backdrop-blur-lg ${theme === "light" ? "bg-white" : ""}  text-white z-50`}>
      
        <h1 onClick={() => {navigate("/")}} className="font-bold text-2xl cursor-pointer text-black dark:text-white ">Threads</h1>
      
      <div className="flex items-center justify-center">
        {isLoggedIn ? (
          <>
            <p className="mr-3">Hello, Aayush</p>
            <a href="/profile">Profile</a>
          </>
        ) : (
          <div className='space-x-2 flex items-center justify-center'>
            <Button onClick={() =>{ navigate('/auth/login')}} variant={'secondary'}>Login</Button>
            <Button onClick={() => {navigate('/auth/signup')}}>Sign Up</Button>
            <ModeToggle/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
