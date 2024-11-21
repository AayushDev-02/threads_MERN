"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: String,
    likes: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Profile",
        },
    ],
}, { timestamps: true });
commentSchema.virtual("likeCount").get(function () {
    return this.likes.length;
});
var threadSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.Types.ObjectId,
            ref: "Profile",
        },
    ],
    comments: [commentSchema],
}, { timestamps: true });
threadSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});
threadSchema.virtual("likeCount").get(function () {
    return this.likes.length;
});
commentSchema.virtual("likeCount").get(function () {
    return this.likes.length;
});
threadSchema.set("toJSON", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });
var Thread = mongoose_1.default.model("Thread", threadSchema);
exports.default = Thread;
