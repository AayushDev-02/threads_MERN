import { Separator } from "../ui/separator"
import { useRecoilValue } from "recoil"
import { profileState, userState } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardTitle } from "../ui/card"
import { useNavigate } from "react-router-dom"

const ProfileCard = () => {
    const navigate = useNavigate()
    const profile = useRecoilValue(profileState)
    const user = useRecoilValue(userState)
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between p-5">
                <div className="flex space-x-2 items-center justify-start">
                    <Avatar >
                        <AvatarImage src={profile?.avatar} />
                        <AvatarFallback>{profile?.username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1>{profile?.username}</h1>
                        <h4 className="text-gray-500">{user?.email}</h4>
                    </div>
                </div>
                <div>
                    <Button onClick={() => navigate(`/profile/${profile?._id}`)}>View Profile</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Card className="w-full px-5 py-3 flex flex-row items-center justify-between">
                    <div className="text-sm font-light">Followers</div>
                    <CardTitle>{profile?.followersCount}</CardTitle>
                </Card>
                <Card className="w-full px-5 py-3 flex flex-row items-center justify-between">
                    <div className="text-sm font-light">Following</div>
                    <CardTitle>{profile?.followingCount}</CardTitle>
                </Card>
            </div>
            <Separator />
        </div>

    )
}

export default ProfileCard
