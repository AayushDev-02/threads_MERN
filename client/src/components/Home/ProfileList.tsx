import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { Profile } from '@/store';
import { useToast } from '../ui/use-toast';



const ProfileList: React.FC = () => {
    const [profileList, setProfileList] = useState<Profile[]>([]);
    const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
    const { toast } = useToast();

    const handleFollowProfile = async (profileId: string) => {
        const data = {};
        try {
            await axios.post(`http://localhost:3000/user/follow/${profileId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });


            setFollowStatus((prevStatus) => ({
                ...prevStatus,
                [profileId]: true,
            }));

            toast({
                variant: "default",
                title: "Followed Successfully",
                description: "Successfully followed the profile",
            });
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error following the profile",
            });
        }
    }

    const handleUnFollowProfile = async (profileId: string) => {
        const data = {};
        try {
            await axios.post(`http://localhost:3000/user/unfollow/${profileId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });


            setFollowStatus((prevStatus) => ({
                ...prevStatus,
                [profileId]: false,
            }));

            toast({
                variant: "default",
                title: "UnFollowed Successfully",
                description: "Successfully unfollowed the profile",
            });
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error unfollowing the profile",
            });
        }
    }

    const handleButtonClick = (profileId: string) => {
        // Use handleFollowProfile if not following, otherwise use handleUnFollowProfile
        const onClickHandler = followStatus[profileId] ? handleUnFollowProfile : handleFollowProfile;

        onClickHandler(profileId);
    };


    useEffect(() => {
        const getAllProfiles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/profile/get/not-followed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });

                setProfileList(res.data.profilesNotFollowed);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        getAllProfiles();
    }, []);

    return (
        <div className='space-y-4 p-5'>
            <div className='text-gray-500 font-bold'>Suggested For You</div>
            {profileList.map((element, index) => (
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

                    <Button onClick={() => handleButtonClick(element._id)} variant={"outline"}>{followStatus[element._id] ? "Unfollow" : "Follow"}</Button>
                </div>
            ))}
        </div>
    );
};

export default ProfileList;
