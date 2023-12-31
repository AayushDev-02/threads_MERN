import { UserCircle2 } from "lucide-react"
import { Separator } from "../ui/separator"

const ProfileCard = () => {
    return (
        <>
        <div className="flex items-center justify-normal p-5">
            <div className="flex space-x-2 items-center justify-start">
                <UserCircle2 width={25} height={25} />
                <div>
                    <h1>Aayush Yadav</h1>
                    <h4 className="text-gray-500">yadavaayush0202@gmai.com</h4>
                </div>
            </div>
        
        </div>
        <Separator/>
        </>
    
    )
}

export default ProfileCard
