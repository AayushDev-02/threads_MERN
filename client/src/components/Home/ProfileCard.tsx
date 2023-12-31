import { UserCircle2 } from "lucide-react"
import { Separator } from "../ui/separator"
import { useRecoilValue } from "recoil"
import { profileState, userState } from "@/store/user"

const ProfileCard = () => {
    
    const profile = useRecoilValue(profileState)
    const user = useRecoilValue(userState)
    return (
        <>
        <div className="flex items-center justify-normal p-5">
            <div className="flex space-x-2 items-center justify-start">
                <UserCircle2 width={25} height={25} />
                <div>
                    <h1>{ profile?.username}</h1>
                    <h4 className="text-gray-500">{user?.email}</h4>
                </div>
            </div>
        
        </div>
        <Separator/>
        </>
    
    )
}

export default ProfileCard
