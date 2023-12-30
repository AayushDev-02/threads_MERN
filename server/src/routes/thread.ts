import express from 'express'
import { z } from "zod"
import dotenv from "dotenv"
import authenticateJwt from '../middleware/auth'
import Profile from '../db/profile'
import Thread from '../db/thread'
dotenv.config()

const router = express.Router()



const ThreadProps = z.object({
    content: z.string().max(200),
    images: z.array(z.object({
        url: z.string().url(),
        caption: z.string().max(100)
    })).optional(),
})

//CREATE THREAD
router.post("/create", authenticateJwt, async (req, res) => {

    const body = ThreadProps.safeParse(req.body);
    if (!body.success) {
        return res.status(403).json({ msg: body.error })
    }

    const userId = req.headers["userId"]
    const content = body.data.content;
    const images = body.data.images;

    const newThreadData = {
        user: userId,
        content: content,
        images: images,
        comments: [],
        likes: [],
    }

    const newThread = new Thread(newThreadData);
    await newThread.save();

    if (!newThread) {
        return res.status(500).json({ msg: "Internal server error" })
    }

    res.status(200).json({
        msg: "Thread created successfully",
        data: newThread
    })

})

// UPDATE THREAD BY ID
router.patch("/:threadId", authenticateJwt, async (req, res) => {

    const body = ThreadProps.safeParse(req.body);
    if (!body.success) {
        return res.status(403).json({ msg: body.error })
    }

    const userId = req.headers["userId"]
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
        return res.status(500).json({ msg: "Internal server error" });
    }


    res.status(200).json({
        msg: "Thread updated successfully",
        data: updatedThread,
    });

})

// DELETE THREAD BY ID
router.delete("/:threadId", authenticateJwt, async (req, res) => {
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
})

// GET THREADS BY USER
router.get('/user/:userId', authenticateJwt, async (req, res) => {
    const userId = req.params.userId;

    const userThreads = await Thread.find({ user: userId });

    res.status(200).json({
        threads: userThreads,
    });
});

// GET CURRENT USER THREADS
router.get('/current', authenticateJwt, async (req, res) => {
    const currentUserId = req.headers['userId'];

    // Use find to get all threads of the current user
    const currentUserThreads = await Thread.find({ user: currentUserId });

    res.status(200).json({
        threads: currentUserThreads,
    });
});

//POST A COMMENT ON THREAD 
router.post('/:threadId/comment', authenticateJwt, async (req, res) => {
    const userId = req.headers['userId'];
    const threadId = req.params.threadId;
    const content = req.body.content;
  
    const newComment = {
      user: userId,
      content: content,
      likes: [],
    };
  
    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { $push: { comments: newComment } },
      { new: true }
    );
  
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
    );
  
    if (!updatedThread) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  
    res.status(200).json({
      msg: 'Comment liked successfully',
      data: updatedThread,
    });
  });

export default router