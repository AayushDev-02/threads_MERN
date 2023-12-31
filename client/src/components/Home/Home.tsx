import React from 'react'
import CreateThread from './CreateThread'
import ProfileCard from './ProfileCard'
import ProfileList from './ProfileList'

const Home = () => {
  return (
    <div className='w-full h-full px-52 flex space-x-32'>
      <div className='w-2/3'>
        <CreateThread />
      </div>
      <div className='w-1/3'>
        <ProfileCard/>
        <ProfileList/>
      </div>
    </div>
  )
}

export default Home
