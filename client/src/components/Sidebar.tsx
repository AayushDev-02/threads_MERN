import { HomeIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { profileState, userState } from '@/store';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const setUser = useSetRecoilState(userState);
    const setProfile = useSetRecoilState(profileState);

    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setProfile(null);
        navigate('/auth/login');
    };

    return (
        <div className='w-full h-full flex flex-col justify-between items-start border-r border-border px-5 py-10 text-black dark:text-white'>
            <div className='space-y-10 w-full'>
                <button onClick={() => navigate('/')} className='p-2 space-x-2 w-full flex items-center justify-start'>
                    <img className='w-8 h-8 ' src="/logo.svg" alt="" />
                    <h2 className='text-2xl font-bold'>Threads</h2>
                </button>
                <div className='space-y-6'>
                    <button
                        onClick={() => navigate('/threads')}
                        className={`flex space-x-3 w-full p-3 ${location.pathname === '/threads' ? 'bg-black w-full font-bold rounded-lg' : ''}`}
                    >
                        {location.pathname === '/threads' ? (
                            <HomeIcon fill='white' color='black' />
                        ) : (
                            <HomeIcon />
                        )}
                        <div>Home</div>
                    </button>
                    <button
                        onClick={() => navigate('/search')}
                        className={`flex space-x-3 w-full p-3 ${location.pathname === '/search' ? 'bg-black w-full font-bold rounded-lg' : ''}`}
                    >
                        {location.pathname === '/search' ? (
                            <SearchIcon fill='white' color='white' />
                        ) : (
                            <SearchIcon />
                        )}
                        <div>Search</div>
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className={`flex space-x-3 w-full p-3 ${location.pathname === '/settings' ? 'bg-black w-full font-bold rounded-lg' : ''}`}
                    >
                         {location.pathname === '/settings' ? (
                            <SettingsIcon fill='white' color='black'  />
                        ) : (
                        <SettingsIcon />
                        )}
                        <div>Settings</div>
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <Button onClick={handleLogOut} className='text-red-500 w-full' variant={'outline'}>
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
