import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { Profile } from '@/store/user';



const ProfileList: React.FC = () => {
    const [profileList, setProfileList] = useState<Profile[]>([]);

    useEffect(() => {
        const getAllProfiles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/profile/current/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });

                console.log(res.data);
                setProfileList(res.data.profiles);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        getAllProfiles();
    }, []);

    return (
        <div className='space-y-4 p-5'>
            {profileList.map((element, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='flex items-center space-x-4'>
                        <Avatar>
                            <AvatarImage src={element.avatar} />
                            <AvatarFallback>{element.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className='space-y-1'>
                            <h1 className='font-semibold'>{element.username}</h1>
                            <p className='text-gray-500'>{element.bio.substring(0, 20) + "......."}</p>
                        </div>
                    </div>

                    <Button variant={"outline"}>Follow</Button>
                </div>
            ))}
        </div>
    );
};

export default ProfileList;
