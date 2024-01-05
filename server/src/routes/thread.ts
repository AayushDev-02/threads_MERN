import express from 'express'
import { z } from "zod"
import dotenv from "dotenv"
import authenticateJwt from '../middleware/auth'
import Profile from '../db/profile'
import Thread from '../db/thread'
dotenv.config()

const router = express.Router()



const ThreadCreateProps = z.object({
    profileId: z.string(),
    content: z.string().max(200),
    images: z.array(z.object({
        url: z.string().url(),
        caption: z.string().max(100)
    })).optional(),
})
const ThreadUpdateProps = z.object({
    content: z.string().max(200),
    images: z.array(z.object({
        url: z.string().url(),
        caption: z.string().max(100)
    })).optional(),
})

const CommnetCreateProps = z.object({
  profileId: z.string(),
  content: z.string().max(200),
})


// CREATE THREAD
router.post('/create', authenticateJwt, async (req, res) => {
  const body = ThreadCreateProps.safeParse(req.body);
  if (!body.success) {
    return res.status(403).json({ msg: body.error });
  }

  const userId = req.headers['userId'];
  const profileId = body.data.profileId;
  const content = body.data.content;
  const images = body.data.images;

  const newThreadData = {
    user: userId,
    profile: profileId,
    content: content,
    images: images,
    comments: [],
    likes: [],
  };

  const newThread = new Thread(newThreadData);
  await newThread.save();

  if (!newThread) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  res.status(200).json({
    msg: 'Thread created successfully',
    data: newThread,
  });
});

// UPDATE THREAD BY ID
router.patch('/:threadId', authenticateJwt, async (req, res) => {
  const body = ThreadUpdateProps.safeParse(req.body);
  if (!body.success) {
    return res.status(403).json({ msg: body.error });
  }

  const userId = req.headers['userId'];
  const content = body.data.content;
  const images = body.data.images;
  const threadId = req.params.threadId;

  const updatedThreadData = {
    content: content,
    images: images,
  };

  const updatedThread = await Thread.findOneAndUpdate(
    { _id: threadId, user: userId },
    updatedThreadData,
    { new: true }
  );

  if (!updatedThread) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  res.status(200).json({
    msg: 'Thread updated successfully',
    data: updatedThread,
  });
});

// DELETE THREAD BY ID
router.delete('/:threadId', authenticateJwt, async (req, res) => {
  const userId = req.headers['userId'];
  const threadId = req.params.threadId;

  const deletedThread = await Thread.findOneAndDelete({
    _id: threadId,
    user: userId,
  });

  if (!deletedThread) {
    return res.status(404).json({ msg: 'Thread not found' });
  }

  res.status(200).json({
    msg: 'Thread deleted successfully',
    data: deletedThread,
  });
});

// GET THREADS BY USER
router.get('/user/:userId', authenticateJwt, async (req, res) => {
  const userId = req.params.userId;

  const userThreads = await Thread.find({ user: userId }).populate('profile user comments.profile');

  res.status(200).json({
    threads: userThreads,
  });
});

// GET THREADS BY PROFILE
router.get('/profile/:profileId', authenticateJwt, async (req, res) => {
  const profileId = req.params.profileId;

  const userThreads = await Thread.find({ profile: profileId }).populate('profile user comments.profile');

  res.status(200).json({
    threads: userThreads,
  });
});

// GET CURRENT USER THREADS
router.get('/current', authenticateJwt, async (req, res) => {
  const currentUserId = req.headers['userId'];

  const currentUserThreads = await Thread.find({ user: currentUserId }).populate('profile user comments.profile');

  res.status(200).json({
    threads: currentUserThreads,
  });
});

//POST A COMMENT ON THREAD 
router.post('/:threadId/comment', authenticateJwt, async (req, res) => {

  const body = CommnetCreateProps.safeParse(req.body)
  if (!body.success) {
    return res.status(403).json({ msg: body.error });
  }

  const userId = req.headers['userId'];
  const threadId = req.params.threadId;
  const content = body.data.content;
  const profileId = body.data.profileId;
  const newComment = {
    user: userId,
    profile: profileId,
    content: content,
    likes: [],
  };

  const updatedThread = await Thread.findByIdAndUpdate(
    threadId,
    { $push: { comments: newComment } },
    { new: true }
  ).populate('comments.user');

  if (!updatedThread) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  res.status(200).json({
    msg: 'Comment added successfully',
    data: updatedThread,
  });
});

//   LIKE A THREAD 
router.post('/:threadId/like', authenticateJwt, async (req, res) => {
  const userId = req.headers['userId'];
  const threadId = req.params.threadId;

  const updatedThread = await Thread.findByIdAndUpdate(
    threadId,
    { $addToSet: { likes: userId } },
    { new: true }
  );

  if (!updatedThread) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  res.status(200).json({
    msg: 'Thread liked successfully',
    data: updatedThread,
  });
});

//   LIKE A COMMENT IN A THREAD
router.post('/:threadId/comment/:commentId/like', authenticateJwt, async (req, res) => {
  const userId = req.headers['userId'];
  const threadId = req.params.threadId;
  const commentId = req.params.commentId;

  const updatedThread = await Thread.findOneAndUpdate(
    { _id: threadId, 'comments._id': commentId },
    { $addToSet: { 'comments.$.likes': userId } },
    { new: true }
  ).populate('comments.user');

  if (!updatedThread) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  res.status(200).json({
    msg: 'Comment liked successfully',
    data: updatedThread,
  });
});

//GET ALL THREADS
router.get('/all', authenticateJwt, async (req, res) => {
  try {
    const allThreads = await Thread.find().populate('profile user comments.profile');
    res.status(200).json({
      threads: allThreads,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// GET THREADS OF FOLLOWED PROFILES
router.get('/followed', authenticateJwt, async (req, res) => {
  try {
    const currentUserId = req.headers['userId'];
    const currentUserProfile = await Profile.findOne({ userId: currentUserId });
    
    if (!currentUserProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    const followedProfilesThreads = await Thread.find({ profile: { $in: currentUserProfile.following } }).populate('profile user comments.profile');
    
    res.status(200).json({
      threads: followedProfilesThreads,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export default router