import { Profile, ThreadsInterface } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreadList from "../ThreadList";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import FollowersList from "../FollowersList";

const ProfilePage = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState<Profile | null>(null);
    const [userThreads, setUserThreads] = useState<ThreadsInterface[]>([]);
    const [followers, setFollowers] = useState<Profile[]>([]);
    const [following, setFollowing] = useState<Profile[]>([]);

    useEffect(() => {
        const getProfileThreads = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/thread/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                console.log(res);
                setUserThreads(res.data.threads);
            } catch (err) {
                console.log(err);
            }
        };

        const getProfileFollowers = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user/followers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                console.log(res.data)

                setFollowers(res.data.followers);
            } catch (err) {
                console.log(err);
            }
        };

        const getProfileFollowing = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user/following/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                console.log(res.data)
                setFollowing(res.data.following);
            } catch (err) {
                console.log(err);
            }
        };

        const getProfile = async () => {
            try {
                // Fetch the profile data from the API
                const res = await axios.get(`http://localhost:3000/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                setProfileData(res.data.profile);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        getProfile()
        getProfileFollowers()
        getProfileThreads()
        getProfileFollowing()
    }, [id])


    return (
        <div className="space-y-6 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-thumb-secondary px-20 lg:px-40 xl:px-72 ">
            {profileData ? (
                <div className="w-full h-full space-y-10">
                    <div className="flex space-x-10 items-center ">
                        <Avatar className="h-56 w-56">
                            <AvatarImage src={profileData?.avatar} />
                            <AvatarFallback>{profileData?.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold">{profileData?.username}</h1>
                                <h4 className="text-gray-500 text-xl ">{profileData?.bio}</h4>
                            </div>
                            <div className="flex space-x-4">
                                <Card className="w-full px-5 py-3 flex flex-row items-center justify-between">
                                    <div className="text-sm font-light">Followers</div>
                                    <CardTitle>{profileData?.followersCount}</CardTitle>
                                </Card>
                                <Card className="w-full px-5 py-3 flex flex-row items-center justify-between">
                                    <div className="text-sm font-light">Following</div>
                                    <CardTitle>{profileData?.followingCount}</CardTitle>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className=" h-fit grid grid-cols-2 gap-5">
                        <div className="h-full ">
                            <ThreadList threads={userThreads} noThreadTitle="No threads" noThreadDesc="This profile has no threads" />
                        </div>
                        <div className="h-fit">
                            <Tabs defaultValue="followers" className="w-full h-fit">
                                <TabsList className="w-full">
                                    <TabsTrigger className="w-full" value="followers">Followers</TabsTrigger>
                                    <TabsTrigger className="w-full" value="following">Following</TabsTrigger>
                                </TabsList>
                                <TabsContent className="w-full h-fit p-5" value="followers"><FollowersList data={followers}/></TabsContent>
                                <TabsContent className="w-full h-fit p-5" value="following"><FollowersList data={following}/></TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    {/* Render other profile details */}
                </div>
            ) : (
                <div className="w-full h-full items-center justify-center">Loading...</div>
            )}
        </div>
    );
};

export default ProfilePage;
