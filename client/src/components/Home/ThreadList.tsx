import { ThreadsInterface } from "@/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

import LikeButton from "./LikeButton";

interface ThreadListProps {
  threads: ThreadsInterface[];
  noThreadTitle: string;
  noThreadDesc: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads,noThreadTitle,noThreadDesc }) => {
  const [displayedThreads, setDisplayedThreads] = useState<number>(10);

  if (threads.length === 0) {
    return (
      <Card className="h-[30rem] space-y-2 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold">{noThreadTitle}</h1>
        <p className="text-lg">{noThreadDesc}</p>
      </Card>
    );
  }

  const reversedThreads = threads.slice().reverse();
  const handleLoadMore = () => {
    setDisplayedThreads((prev) => prev + 10);
  };

  

  return (
    <div>
      <div className="space-y-5">
        {reversedThreads.slice(0, displayedThreads).map((thread, index) => (
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
                <LikeButton threadId={thread._id} likesArr={thread.likes} likeCount={thread.likeCount} />
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
      {displayedThreads < threads.length && (
        <Button variant={'outline'} onClick={handleLoadMore} className="w-full">
          Load More
        </Button>
      )}
    </div>
  );
};

export default ThreadList;
