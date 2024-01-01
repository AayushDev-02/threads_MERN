import { profileIdSelector, userIdSelector } from '@/store'
import axios from 'axios';
import { HeartIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast';
import { useRecoilValue } from 'recoil';

interface LikeButtonProps {
    likeCount: number;
    likesArr: string[];
    threadId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ likeCount, likesArr, threadId }) => {

    const { toast } = useToast();

    const [likes, setLikes] = useState<number>(likeCount)
    const profileId = useRecoilValue(profileIdSelector)
    const userId = useRecoilValue(userIdSelector)

    const handleLikeClick = async () => {
        const data = {
            profileId: profileId,
        };
        try {
            const res = await axios.post(`http://localhost:3000/thread/${threadId}/like`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            console.log(res)

            setLikes(likes + 1);
            if(userId){
                likesArr.push(userId)
            }
        } catch (err) {
            console.log(err)
            toast({
                title: "destructive",
                description: "Error posting a like",
            });
        }
    };
    return (
        <>
            {userId && likesArr.includes(userId) ? (
                <div className="flex space-x-2">
                    <HeartIcon fill='#FF0000' color='#FF0000' />
                    <span>{likes}</span>
                </div >
            ) : (
                <button onClick={() => handleLikeClick()} className="flex space-x-2">
                    <HeartIcon />
                    <span>{likeCount}</span>
                </button >
            )}
        </>
    )
}

export default LikeButton
