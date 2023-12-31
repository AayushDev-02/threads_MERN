import { ThreadsInterface, profileState } from "@/store/user";
import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { HeartIcon, MessageCircle } from "lucide-react";



interface PersonalThreadsProps {
  personalThreads: ThreadsInterface[];
}

const PersonalThreads: React.FC<PersonalThreadsProps> = ({ personalThreads }) => {
  console.log(personalThreads)
  const profile = useRecoilValue(profileState)
  return (
    <div>
      <div className="space-y-5">
        {personalThreads.map((thread, index) => (
          <div key={index}>
            <div className="flex space-x-4 py-5">
              <Avatar>
                <AvatarImage src={profile?.avatar} />
                <AvatarFallback>{profile?.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div>{profile?.username}</div>
                  <h1>{thread.content}</h1>
                </div>
                <div className="flex space-x-5">
                  <button className="flex space-x-2">
                    <HeartIcon />
                    <span>{thread.likeCount}</span>
                  </button>
                  <button className="flex space-x-2">
                    <MessageCircle />
                    <span>{thread.commentCount}</span>
                  </button>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalThreads;
