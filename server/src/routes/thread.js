"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var zod_1 = require("zod");
var dotenv_1 = require("dotenv");
var auth_1 = require("../middleware/auth");
var profile_1 = require("../db/profile");
var thread_1 = require("../db/thread");
dotenv_1.default.config();
var router = express_1.default.Router();
var ThreadCreateProps = zod_1.z.object({
    profileId: zod_1.z.string(),
    content: zod_1.z.string().max(200),
    images: zod_1.z.array(zod_1.z.object({
        url: zod_1.z.string().url(),
        caption: zod_1.z.string().max(100)
    })).optional(),
});
var ThreadUpdateProps = zod_1.z.object({
    content: zod_1.z.string().max(200),
    images: zod_1.z.array(zod_1.z.object({
        url: zod_1.z.string().url(),
        caption: zod_1.z.string().max(100)
    })).optional(),
});
var CommnetCreateProps = zod_1.z.object({
    profileId: zod_1.z.string(),
    content: zod_1.z.string().max(200),
});
// CREATE THREAD
router.post('/create', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userId, profileId, content, images, newThreadData, newThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = ThreadCreateProps.safeParse(req.body);
                if (!body.success) {
                    return [2 /*return*/, res.status(403).json({ msg: body.error })];
                }
                userId = req.headers['userId'];
                profileId = body.data.profileId;
                content = body.data.content;
                images = body.data.images;
                newThreadData = {
                    user: userId,
                    profile: profileId,
                    content: content,
                    images: images,
                    comments: [],
                    likes: [],
                };
                newThread = new thread_1.default(newThreadData);
                return [4 /*yield*/, newThread.save()];
            case 1:
                _a.sent();
                if (!newThread) {
                    return [2 /*return*/, res.status(500).json({ msg: 'Internal server error' })];
                }
                res.status(200).json({
                    msg: 'Thread created successfully',
                    data: newThread,
                });
                return [2 /*return*/];
        }
    });
}); });
// UPDATE THREAD BY ID
router.patch('/:threadId', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userId, content, images, threadId, updatedThreadData, updatedThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = ThreadUpdateProps.safeParse(req.body);
                if (!body.success) {
                    return [2 /*return*/, res.status(403).json({ msg: body.error })];
                }
                userId = req.headers['userId'];
                content = body.data.content;
                images = body.data.images;
                threadId = req.params.threadId;
                updatedThreadData = {
                    content: content,
                    images: images,
                };
                return [4 /*yield*/, thread_1.default.findOneAndUpdate({ _id: threadId, user: userId }, updatedThreadData, { new: true })];
            case 1:
                updatedThread = _a.sent();
                if (!updatedThread) {
                    return [2 /*return*/, res.status(500).json({ msg: 'Internal server error' })];
                }
                res.status(200).json({
                    msg: 'Thread updated successfully',
                    data: updatedThread,
                });
                return [2 /*return*/];
        }
    });
}); });
// DELETE THREAD BY ID
router.delete('/:threadId', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, threadId, deletedThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers['userId'];
                threadId = req.params.threadId;
                return [4 /*yield*/, thread_1.default.findOneAndDelete({
                        _id: threadId,
                        user: userId,
                    })];
            case 1:
                deletedThread = _a.sent();
                if (!deletedThread) {
                    return [2 /*return*/, res.status(404).json({ msg: 'Thread not found' })];
                }
                res.status(200).json({
                    msg: 'Thread deleted successfully',
                    data: deletedThread,
                });
                return [2 /*return*/];
        }
    });
}); });
// GET THREADS BY USER
router.get('/user/:userId', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userThreads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, thread_1.default.find({ user: userId }).populate('profile user comments.profile')];
            case 1:
                userThreads = _a.sent();
                res.status(200).json({
                    threads: userThreads,
                });
                return [2 /*return*/];
        }
    });
}); });
// GET THREADS BY PROFILE
router.get('/profile/:profileId', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, userThreads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.params.profileId;
                return [4 /*yield*/, thread_1.default.find({ profile: profileId }).populate('profile user comments.profile')];
            case 1:
                userThreads = _a.sent();
                res.status(200).json({
                    threads: userThreads,
                });
                return [2 /*return*/];
        }
    });
}); });
// GET CURRENT USER THREADS
router.get('/current', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserId, currentUserThreads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUserId = req.headers['userId'];
                return [4 /*yield*/, thread_1.default.find({ user: currentUserId }).populate('profile user comments.profile')];
            case 1:
                currentUserThreads = _a.sent();
                res.status(200).json({
                    threads: currentUserThreads,
                });
                return [2 /*return*/];
        }
    });
}); });
//POST A COMMENT ON THREAD 
router.post('/:threadId/comment', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userId, threadId, content, profileId, newComment, updatedThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = CommnetCreateProps.safeParse(req.body);
                if (!body.success) {
                    return [2 /*return*/, res.status(403).json({ msg: body.error })];
                }
                userId = req.headers['userId'];
                threadId = req.params.threadId;
                content = body.data.content;
                profileId = body.data.profileId;
                newComment = {
                    user: userId,
                    profile: profileId,
                    content: content,
                    likes: [],
                };
                return [4 /*yield*/, thread_1.default.findByIdAndUpdate(threadId, { $push: { comments: newComment } }, { new: true }).populate('comments.user')];
            case 1:
                updatedThread = _a.sent();
                if (!updatedThread) {
                    return [2 /*return*/, res.status(500).json({ msg: 'Internal server error' })];
                }
                res.status(200).json({
                    msg: 'Comment added successfully',
                    data: updatedThread,
                });
                return [2 /*return*/];
        }
    });
}); });
//   LIKE A THREAD 
router.post('/:threadId/like', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, threadId, updatedThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers['userId'];
                threadId = req.params.threadId;
                return [4 /*yield*/, thread_1.default.findByIdAndUpdate(threadId, { $addToSet: { likes: userId } }, { new: true })];
            case 1:
                updatedThread = _a.sent();
                if (!updatedThread) {
                    return [2 /*return*/, res.status(500).json({ msg: 'Internal server error' })];
                }
                res.status(200).json({
                    msg: 'Thread liked successfully',
                    data: updatedThread,
                });
                return [2 /*return*/];
        }
    });
}); });
//   LIKE A COMMENT IN A THREAD
router.post('/:threadId/comment/:commentId/like', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, threadId, commentId, updatedThread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers['userId'];
                threadId = req.params.threadId;
                commentId = req.params.commentId;
                return [4 /*yield*/, thread_1.default.findOneAndUpdate({ _id: threadId, 'comments._id': commentId }, { $addToSet: { 'comments.$.likes': userId } }, { new: true }).populate('comments.user')];
            case 1:
                updatedThread = _a.sent();
                if (!updatedThread) {
                    return [2 /*return*/, res.status(500).json({ msg: 'Internal server error' })];
                }
                res.status(200).json({
                    msg: 'Comment liked successfully',
                    data: updatedThread,
                });
                return [2 /*return*/];
        }
    });
}); });
//GET ALL THREADS
router.get('/all', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allThreads, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, thread_1.default.find().populate('profile user comments.profile')];
            case 1:
                allThreads = _a.sent();
                res.status(200).json({
                    threads: allThreads,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ msg: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET THREADS OF FOLLOWED PROFILES
router.get('/followed', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserId, currentUserProfile, followedProfilesThreads, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                currentUserId = req.headers['userId'];
                return [4 /*yield*/, profile_1.default.findOne({ userId: currentUserId })];
            case 1:
                currentUserProfile = _a.sent();
                if (!currentUserProfile) {
                    return [2 /*return*/, res.status(404).json({ msg: 'User profile not found' })];
                }
                return [4 /*yield*/, thread_1.default.find({ profile: { $in: currentUserProfile.following } }).populate('profile user comments.profile')];
            case 2:
                followedProfilesThreads = _a.sent();
                res.status(200).json({
                    threads: followedProfilesThreads,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ msg: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
