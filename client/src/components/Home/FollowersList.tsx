import { Profile } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"


interface FollowersListProps {
    data: Profile[]
    noDataDesc : string;
}

const FollowersList: React.FC<FollowersListProps> = ({data, noDataDesc}) => {

    if(data.length === 0){
        return (
            <Card className="h-[25.7rem] space-y-2 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold">Not found</h1>
            <p className="text-lg">{noDataDesc}</p>
        </Card>
        )
    }

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
