import { ThreadsInterface, profileState } from "@/store";
import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Card } from "../ui/card";



interface PersonalThreadsProps {
  personalThreads: ThreadsInterface[];
}

const PersonalThreads: React.FC<PersonalThreadsProps> = ({ personalThreads }) => {
  const profile = useRecoilValue(profileState)

  if ((personalThreads.length === 0)) {
    return (

      <Card className=" h-[30rem] space-y-2 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold">No Thread</h1>
        <p className="text-lg ">Create your first thread now</p>
      </Card>

    )
  }
  return (
    <div>
      <div className="space-y-5">
        {personalThreads.slice().reverse().reverse().map((thread, index) => (
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
