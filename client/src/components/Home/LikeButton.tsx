import { profileIdSelector, userIdSelector } from '@/store'
import axios from 'axios';
import { HeartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast';
import { useRecoilValue } from 'recoil';

interface LikeButtonProps {
    likeCount: number;
    likesArr: string[];
    threadId: string;
    type?: "Thread" | "Comment";
    commentId?: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ likeCount, likesArr, threadId, type="Thread", commentId }) => {

    const { toast } = useToast();
    const [postUrl, setPostUrl] = useState<string>(`http://localhost:3000/thread/${threadId}/like`)
    const [likes, setLikes] = useState<number>(likeCount)
    const profileId = useRecoilValue(profileIdSelector)
    const userId = useRecoilValue(userIdSelector)

    const handleLikeClick = async () => {
        const data = {
            profileId: profileId,
        };
        try {
            const res = await axios.post(postUrl, data, {
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

    useEffect(() => {
        if(type === "Comment") {
            setPostUrl(`http://localhost:3000/thread/${threadId}/comment/${commentId}/like`)
        }
        else{
            setPostUrl(`http://localhost:3000/thread/${threadId}/like`)
        }
    },[type, commentId, threadId])
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
