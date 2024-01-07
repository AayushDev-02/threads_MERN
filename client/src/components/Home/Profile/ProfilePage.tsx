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
import { GithubIcon, Link, LinkedinIcon, StarsIcon } from "lucide-react";

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
                console.log(res.data.profile)
                setProfileData(res.data.profile);
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
                        <div className="space-y-4 w-3/5">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold">{profileData?.username}</h1>
                                <h4 className="text-gray-500 text-xl ">{profileData?.bio}</h4>
                            </div>
                            <div className="space-y-2">
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
                                <div className="grid grid-cols-4 gap-2 w-full">
                                    {Object.entries(profileData.links).map((element, index) => {

                                        if (element[0].toLowerCase() === "github") {
                                            return (
                                                <a className="w-full col-span-1" key={index} href={element[1]}>
                                                    <Card className="flex space-x-2 px-5 py-3 w-full">
                                                        <GithubIcon fill="#023e8a" color="#023e8a" />
                                                        <div className="capitalize font-bold" >{element[0]}</div>
                                                    </Card>
                                                </a>
                                            )
                                        }
                                        if (element[0].toLowerCase() === "linkedin") {
                                            return (
                                                <a className="w-full col-span-1" key={index} href={element[1]}>
                                                    <Card className="flex space-x-2 px-5 py-3 w-full">
                                                        <LinkedinIcon fill="#caf0f8" color="#caf0f8" />
                                                        <div className="capitalize font-bold" >{element[0]}</div>
                                                    </Card>
                                                </a>
                                            )
                                        }
                                        if (element[0].toLowerCase() === "portfolio") {
                                            return (
                                                <a className="w-full col-span-1" key={index} href={element[1]}>
                                                    <Card className="flex space-x-2 px-5 py-3 w-full">
                                                        <StarsIcon fill="#ffba08" color="#ffba08" />
                                                        <div className="capitalize font-bold" >{element[0]}</div>
                                                    </Card>
                                                </a>
                                            )
                                        }
                                        return (
                                            <a className="w-full col-span-1" key={index} href={element[1]}>
                                                <Card className="flex space-x-2 px-5 py-3 w-full">
                                                    <Link fill="#e5e5e5" color="#e5e5e5" />
                                                    <div className="capitalize font-bold" >{element[0]}</div>
                                                </Card>
                                            </a>
                                        )
                                    })}
                                </div>
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
                                <TabsContent className="w-full h-fit p-5" value="followers"><FollowersList data={followers} noDataDesc="This account do not follow anyone." /></TabsContent>
                                <TabsContent className="w-full h-fit p-5" value="following"><FollowersList noDataDesc="No one is following this account" data={following} /></TabsContent>
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
