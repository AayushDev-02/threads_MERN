import { Profile } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


interface FollowersListProps {
    data: Profile[]
}

const FollowersList: React.FC<FollowersListProps> = ({data}) => {
  return (
    <div className='space-y-4 p-5'>
            {data.map((element, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='flex items-center space-x-4'>
                        <Avatar>
                            <AvatarImage src={element.avatar} />
                            <AvatarFallback>{element.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className='space-y-1'>
                            <h1 className='font-semibold'>{element.username}</h1>
                            <p className='text-gray-500 text-sm'>{element.bio.substring(0, 15) + "......."}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
  )
}

export default FollowersList
