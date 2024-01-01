import { ThreadsInterface } from "@/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Card } from "../ui/card";

interface ExploreThreadsProps {
  allThreads: ThreadsInterface[];
}

const ExploreThreads: React.FC<ExploreThreadsProps> = ({ allThreads }) => {

  if ((allThreads.length === 0)) {
    return (

      <Card className=" h-[30rem] space-y-2 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold">No Thread</h1>
        <p className="text-lg ">Be the first one to thread</p>
      </Card>

    )
  }

  return (
    <div>
      <div className="space-y-5">
        {allThreads.slice().reverse().map((thread, index) => (
          <div key={index}>
            <div className="flex space-x-4 py-5">
              <Avatar>
                <AvatarImage src={thread.profile.avatar} />
                <AvatarFallback>{thread.profile.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div>{thread.profile.username}</div>
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
  )
}

export default ExploreThreads
