import { useState } from "react";
import { useToast } from "../../ui/use-toast";
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
import { Label } from "../../ui/label";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileIdSelector, threadUpdate } from "@/store";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { PlusSquareIcon } from "lucide-react";
import axiosInstance from '@/utils/axiosInstance';

interface CommentButtonProps {
    threadId: string;
}

const CommentButton:React.FC<CommentButtonProps> = ({threadId}) => {
    const profileId = useRecoilValue(profileIdSelector)
    const [commentContent, setCommentContent] = useState<string>("");
    const { toast } = useToast();
    const [threadsUpdate , setThreadsUpdate] = useRecoilState(threadUpdate)
    

    const handleAddCommnet = async (threadId: string) => {
        console.log(profileId)
        const data = {
            profileId: profileId,
            content: commentContent
        };
        try {
            await axiosInstance.post(`/thread/${threadId}/comment`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            setThreadsUpdate(!threadsUpdate)

            toast({
                title: "Success",
                variant: "default",
                description: "Comment Posted Successfully",
            });

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
        <Dialog>
            <DialogTrigger>
                <PlusSquareIcon/>
            </DialogTrigger>

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
                        <Button onClick={() => handleAddCommnet(threadId)} type="button" className="xl:w-full" variant="default">
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CommentButton
