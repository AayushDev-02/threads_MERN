import { HeartIcon, HomeIcon, PlusSquare, SearchIcon, UserCircle2Icon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full flex flex-col justify-between items-start border-r border-border px-5 py-10 text-black dark:text-white'>
            <div className='space-y-10'>
                <button onClick={() => {navigate("/")}} className='p-2'>
                <img className='w-8 h-8 ' src="/logo.svg" alt="" />
                </button>
                <div className='space-y-6'>
                    <button className='flex space-x-3 w-full p-2'>
                        <HomeIcon/>
                        <div>Home</div>
                    </button>
                    <button className='flex space-x-3 w-full p-2'>
                        <SearchIcon />
                        <div>Search</div>
                    </button>
                    <button className='flex space-x-3 w-full p-2'>
                        <PlusSquare/>
                        <div>Create</div>
                    </button>
                    <button className='flex space-x-3 w-full p-2'>
                        <HeartIcon />
                        <div>Activity</div>
                    </button>
                    <button className='flex space-x-3 w-full p-2'>
                        <UserCircle2Icon />
                        <div>Profile</div>
                    </button>
                   
                </div>
            </div>
            <div className='w-full'>
                <Button className='text-red-500 w-full' variant={'outline'}>Sign Out</Button>
            </div>
        </div>
    )
}

export default Sidebar
