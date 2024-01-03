import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { Profile } from '@/store';



const ProfileList: React.FC = () => {
    const [profileList, setProfileList] = useState<Profile[]>([]);

    useEffect(() => {
        const getAllProfiles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/profile/get/not-followed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });

                // console.log(res.data);
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

                    <Button variant={"outline"}>Follow</Button>
                </div>
            ))}
        </div>
    );
};

export default ProfileList;
