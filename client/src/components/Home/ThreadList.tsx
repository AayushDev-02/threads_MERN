import { ThreadsInterface } from "@/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

import LikeButton from "./LikeButton";
import { Separator } from "../ui/separator";
import ImageGrid from "./ImageGrid";
import CommentList from "./CommentList";

interface ThreadListProps {
    threads: ThreadsInterface[];
    noThreadTitle: string;
    noThreadDesc: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, noThreadTitle, noThreadDesc }) => {
    const [displayedThreads, setDisplayedThreads] = useState<number>(10);
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
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

    const handleToggleComments = (threadId: string) => {
        setSelectedThreadId((prev) => (prev === threadId ? null : threadId));
    };

    return (
        <div>
            <div className="space-y-5">
                {reversedThreads.slice(0, displayedThreads).map((thread, index) => (
                    <div key={index}>
                        <div className={`flex space-x-4  ${thread.commentCount === 0 || (!selectedThreadId) ? "py-5" : "pt-5"}`}>
                            <div className="flex flex-col items-center">
                                <Avatar >
                                    <AvatarImage src={thread.profile.avatar} />
                                    <AvatarFallback>{thread.profile.username.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {thread.commentCount !== 0 && (
                                    <>
                                        <div className="relative  w-0.5 grow rounded-full bg-neutral-800"></div>
                                        {!selectedThreadId && (

                                            <div className="flex flex-row  ">
                                                {thread.comments.slice(0, 2).map((comment, index) => {
                                                    const isFirst = index === 0;
                                                    return (
                                                        <div key={index} className={` ${isFirst ? "" : "-ml-1.5"} `}>
                                                            <Avatar className="h-7 w-7">
                                                                <AvatarImage src={comment.profile.avatar} />
                                                                <AvatarFallback>{comment.profile.username.substring(0, 2)}</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="space-y-4">

                                <div className="space-y-1">
                                    <div>{thread.profile.username}</div>
                                    <h1>{thread.content}</h1>
                                </div>
                                {thread.images && (
                                    <div>
                                        <ImageGrid images={thread.images} size="Large" />
                                    </div>
                                )}
                                <div className={`flex space-x-5   ${thread.commentCount === 0 ? "" : "pb-5"}`}>
                                    <LikeButton threadId={thread._id} likesArr={thread.likes} likeCount={thread.likeCount} />
                                    <button onClick={() => handleToggleComments(thread._id)} className="flex space-x-2">
                                        <MessageCircle />
                                        <span>{thread.commentCount}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {selectedThreadId === thread._id && (
                            <CommentList comments={thread.comments || []} />
                        )}
                        <Separator />
                    </div>
                ))}
            </div>
            {displayedThreads < threads.length && (
                <Button variant={'outline'} onClick={handleLoadMore} className="w-full mt-5">
                    Load More
                </Button>
            )}
        </div>
    );
};

export default ThreadList;
