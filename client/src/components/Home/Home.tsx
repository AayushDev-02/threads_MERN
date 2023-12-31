import CreateThread from './CreateThread'
import ProfileCard from './Profile/ProfileCard'
import ProfileList from './Profile/ProfileList'
import Threads from '../Threads'

const Home = () => {
  return (
    <div className='w-full h-full  px-52 flex space-x-32'>
      <div className='w-2/3 pr-5 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-thumb-secondary space-y-5'>
        <CreateThread />
        <Threads/>
      </div>
      <div className='w-1/3'>
        <ProfileCard/>
        <ProfileList/>
      </div>
    </div>
  )
}

export default Home
