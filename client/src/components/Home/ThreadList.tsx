import { ThreadsInterface, profileIdSelector } from "@/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

import LikeButton from "./LikeButton";
import { Separator } from "../ui/separator";
import ImageGrid from "./ImageGrid";
import CommentList from "./CommentList";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface ThreadListProps {
    threads: ThreadsInterface[];
    noThreadTitle: string;
    noThreadDesc: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, noThreadTitle, noThreadDesc }) => {
    const [displayedThreads, setDisplayedThreads] = useState<number>(10);
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
    const [commentContent, setCommentContent] = useState<string>("");
    const profileId = useRecoilValue(profileIdSelector)
    const { toast } = useToast();

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
    console.log(profileId)
    const handleAddCommnet = async (threadId: string) => {
        console.log(profileId)
        const data = {
            profileId: profileId,
            content: commentContent
        };
        try {
            const res = await axios.post(`http://localhost:3000/thread/${threadId}/comment`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            console.log(res)


        } catch (err) {
            console.log(err)
            toast({
                title: "Error",
                variant: "destructive",
                description: "Error posting a comment",
            });
        }
    }

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
                                    <Dialog>
                                        <DialogTrigger>Comment</DialogTrigger>

                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Add Comment</DialogTitle>
                                                <DialogDescription>
                                                    Add a comment to share your views on this thread
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-5" >
                                                <div className="space-y-2" >
                                                    <Label >Content</Label>
                                                    <Textarea onChange={(e) => setCommentContent(e.target.value)} id="imageUrl" />
                                                </div>

                                            </div>
                                            <DialogFooter className="sm:justify-start ">
                                                <DialogClose asChild>
                                                    <Button onClick={() => handleAddCommnet(thread._id)} type="button" className="xl:w-full" variant="default">
                                                        Add
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        {selectedThreadId === thread._id && (
                            <CommentList threadId={thread._id} comments={thread.comments || []} />
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
