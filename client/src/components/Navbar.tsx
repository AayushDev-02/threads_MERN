import {  useNavigate } from 'react-router-dom'; // Use the appropriate router library
import { Button } from './ui/button';
import { ModeToggle } from './ui/modeToggler';
import { useTheme } from './theme-provider';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {  profileState, userState } from '@/store';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const user = useRecoilValue(userState)
  

  return (
    <div className={`flex fixed top-0 w-full border-b border-border justify-between items-center h-20 px-10 backdrop-blur-lg ${theme === 'light' ? 'bg-white' : ''} text-white z-50`}>
      <h1 onClick={() => navigate('/')} className="font-bold text-2xl cursor-pointer text-black dark:text-white">
        Threads
      </h1>
      <div className="flex items-center justify-center space-x-2">
        {user ? (
          <AuthenticatedContent />
        ) : (
          <UnauthenticatedContent onLogin={() => navigate('/auth/login')} onSignup={() => navigate('/auth/signup')} />
        )}
        <ModeToggle />
      </div>
    </div>
  );
};


const AuthenticatedContent = () => {

  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  const [profile, setProfile] = useRecoilState(profileState);

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    if(profile) {
      setProfile(null)
    }
  };

  return (
  <>
    {profile ? (
      <div className='space-x-2'>
        <Button onClick={() => navigate('/threads')}>{profile.username}</Button>
        <Button variant={'outline'} className='text-red-500' onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    ) : (
      
      <>
        <Button onClick={() => navigate('/profile')}>Complete Profile</Button>
        <Button variant={'outline'} className='text-red-500' onClick={handleLogOut}>
          Log Out
        </Button>
      </>
    )}
  </>
  )
};

const UnauthenticatedContent: React.FC<{ onLogin: () => void; onSignup: () => void }> = ({ onLogin, onSignup }) => {
  return (
  <div className='space-x-2 flex items-center justify-center'>
    <Button onClick={onLogin} variant={'secondary'}>
      Login
    </Button>
    <Button onClick={onSignup}>Sign Up</Button>
  </div>
)};


export default Navbar;
