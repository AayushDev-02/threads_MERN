import mongoose, { Document, Schema, Types } from "mongoose";

interface Comment {
    user: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    likeCount: number;
}

interface Image {
    url: string;
    caption?: string;
}

interface ThreadDocument extends Document {
    user: Types.ObjectId;
    content: string;
    images?: Image[];
    likes: Types.ObjectId[];
    comments: Comment[];
    commentCount: number;
    likeCount: number;
}

const commentSchema = new Schema<Comment>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: String,
        likes: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

commentSchema.virtual("likeCount").get(function (this: Comment) {
    return this.likes.length;
});

const threadSchema = new Schema<ThreadDocument>(
    {
        user: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        images: [
            {
                url: String,
                caption: String,
            },
        ],
        likes: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [commentSchema],
    },
    { timestamps: true }
);

threadSchema.virtual("commentCount").get(function (this: ThreadDocument) {
    return this.comments.length;
});

// Define virtual property for like count
threadSchema.virtual("likeCount").get(function (this: ThreadDocument) {
    return this.likes.length;
});

threadSchema.set("toJSON", { virtuals: true });

const Thread = mongoose.model<ThreadDocument>("Thread", threadSchema);


export default Thread;
