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
dotenv_1.default.config();
var router = express_1.default.Router();
var SECRET = process.env.JWT_SECRET;
var userProfileCreateProps = zod_1.z.object({
    username: zod_1.z.string().min(5).max(30),
    bio: zod_1.z.string().max(100),
    links: zod_1.z.record(zod_1.z.string().url()),
    avatar: zod_1.z.string().url(),
    location: zod_1.z.object({
        city: zod_1.z.string().max(20),
        state: zod_1.z.string().max(20),
        country: zod_1.z.string().max(20),
    }),
});
var userProfileUpdateProps = zod_1.z.object({
    username: zod_1.z.string().min(5).max(30).optional(),
    bio: zod_1.z.string().max(100).optional(),
    links: zod_1.z.record(zod_1.z.string().url()).optional(),
    avatar: zod_1.z.string().url().optional(),
    location: zod_1.z.object({
        city: zod_1.z.string().max(20),
        state: zod_1.z.string().max(20),
        country: zod_1.z.string().max(20),
    }).optional(),
});
//Create User profile
router.post("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, username, bio, links, avatar, city, state, country, userId, existingProfile, newProfileData, newProfile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = userProfileCreateProps.safeParse(req.body);
                if (!body.success) {
                    return [2 /*return*/, res.status(403).json({ msg: body.error })];
                }
                username = body.data.username;
                bio = body.data.bio;
                links = body.data.links;
                avatar = body.data.avatar;
                city = body.data.location.city;
                state = body.data.location.state;
                country = body.data.location.country;
                userId = req.headers["userId"];
                return [4 /*yield*/, profile_1.default.findOne({ userId: userId })];
            case 1:
                existingProfile = _a.sent();
                if (existingProfile) {
                    return [2 /*return*/, res.status(403).json({ msg: "Profile already exists" })];
                }
                newProfileData = {
                    username: username,
                    bio: bio,
                    userId: userId,
                    links: links,
                    avatar: avatar,
                    location: {
                        city: city,
                        state: state,
                        country: country
                    },
                    followers: [],
                    following: []
                };
                newProfile = new profile_1.default(newProfileData);
                return [4 /*yield*/, newProfile.save()];
            case 2:
                _a.sent();
                res.status(200).json({
                    msg: "Profile created Successfully",
                    profile: newProfile
                });
                return [2 /*return*/];
        }
    });
}); });
//GET CURRENT USER PROFILE
router.get("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers["userId"];
                return [4 /*yield*/, profile_1.default.findOne({ userId: userId })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(401).json({ msg: "Profile does not exists" })];
                }
                res.status(200).json({
                    profile: profile
                });
                return [2 /*return*/];
        }
    });
}); });
//GET PROFILE BY ID
router.get("/:profileId", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.params.profileId;
                return [4 /*yield*/, profile_1.default.findOne({ _id: profileId })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(401).json({ msg: "Profile does not exists" })];
                }
                res.status(200).json({
                    profile: profile
                });
                return [2 /*return*/];
        }
    });
}); });
// GET ALL PROFILES
router.get("/current/all", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profiles, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile_1.default.find({})];
            case 1:
                profiles = _a.sent();
                if (!profiles) {
                    return [2 /*return*/, res.status(404).json({ msg: "No profiles found" })];
                }
                res.status(200).json({
                    profiles: profiles
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ msg: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET PROFILE BY USERNAME
router.get("/find/:username", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                return [4 /*yield*/, profile_1.default.findOne({ username: username })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(404).json({ msg: "Profile not found" })];
                }
                res.status(200).json({
                    profile: profile
                });
                return [2 /*return*/];
        }
    });
}); });
//UPDATE PROFILE
router.patch("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, updatedProfileData, userId, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = userProfileUpdateProps.safeParse(req.body);
                if (!body.success) {
                    return [2 /*return*/, res.status(401).json({ msg: body.error })];
                }
                updatedProfileData = body.data;
                userId = req.headers["userId"];
                return [4 /*yield*/, profile_1.default.findOneAndUpdate({ userId: userId }, updatedProfileData)];
            case 1:
                response = _a.sent();
                if (!response) {
                    res.status(500).json({ msg: "Internal server error" });
                }
                res.status(200).json({ msg: "Profile updated successfully" });
                return [2 /*return*/];
        }
    });
}); });
//GET PROFILES NOT FOLLOWED BY CURRENT USER
router.get("/get/not-followed", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, currentUserProfile, profilesNotFollowed, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.headers["userId"];
                return [4 /*yield*/, profile_1.default.findOne({ userId: userId })];
            case 1:
                currentUserProfile = _a.sent();
                if (!currentUserProfile) {
                    return [2 /*return*/, res.status(404).json({ msg: "Current user profile not found" })];
                }
                return [4 /*yield*/, profile_1.default.find({
                        _id: { $ne: currentUserProfile._id },
                        followers: { $nin: [currentUserProfile._id] },
                    })];
            case 2:
                profilesNotFollowed = _a.sent();
                res.status(200).json({
                    profilesNotFollowed: profilesNotFollowed,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ msg: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
