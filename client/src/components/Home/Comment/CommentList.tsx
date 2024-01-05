import { Comment } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import LikeButton from "../LikeButton"
import { Card } from "../../ui/card"

interface CommentListProps {
    comments: Comment[]
    threadId: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, threadId }) => {

    console.log(comments)
    const commentLength = comments.length;
    if (comments.length === 0) {
        return (
            <Card className=" p-5 mb-5">
                No Comments
            </Card>
        )
    }

    return (
        <div>
            {comments.map((comment, index) => {
                const isLast = index === commentLength - 1;
                return (
                    <div key={index}>
                        <div className={`flex space-x-4 `}>
                            <div className="flex flex-col items-center">
                                <Avatar >
                                    <AvatarImage src={comment.profile.avatar} />
                                    <AvatarFallback>{comment.profile.username.substring(0, 2)}</AvatarFallback>
                                </Avatar>

                                {!isLast && (
                                    <div className="relative  w-0.5 grow rounded-full bg-neutral-800"></div>
                                )}

                            </div>
                            <div className="space-y-4">

                                <div className="space-y-1">
                                    <div>{comment.profile.username}</div>
                                    <h1>{comment.content}</h1>
                                </div>
                                <div className={`flex space-x-5  pb-5`}>
                                    <LikeButton type="Comment" threadId={threadId} commentId={comment._id} likesArr={comment.likes} likeCount={comment.likeCount} />

                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentList
