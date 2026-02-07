const express = require('express');
const router = express.Router();
const discussionPostModel = require('../dataModels/discussionPostModel');
const { jwtAuth } = require('../modules/jwt');


router.post('/create', jwtAuth, async (req, res) => {

    try
    {       
        const data = req.body;

        const mappedData = {
            name: data.name,
            time: data.time,
            editedFlag: data.editedFlag,
            postTitle: data.date,
            postBody: data.postBody,
            parentThread: data.parentThread,
            author: data.author
        }

        console.log('Received discussionPost Details: ', mappedData);

        const discussionPost = new discussionPostModel(mappedData);
        await discussionPost.save();
        
        res.status(200).json({msg: 'Post Created successfully'});
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


router.get('/getPosts', jwtAuth, async(req, res) => {

    try
    {
        const posts = await discussionPostModel.find();
        res.status(200).json(posts);
    }
    catch(e)
    {
        console.log('error sending discussionPost details: ', e.message);
        res.status(500).json('something went wrong');
    }
});


// router.put('/editPost/:postID', jwtAuth, async(req, res) => {

//     try
//     {
//         const postID = req.params.postID;
//         const uid = req.user.id;

//         const result = await eventModel.updateOne(
//             {
//                 _id: eventID,
//                 participants: { $ne: uid },
//                 $expr: {
//                     $or: [
//                       { $eq: ["$maxParticipants", 0] },
//                       { $lt: [{ $size: "$participants" }, "$maxParticipants"] }
//                     ]
//                   }
//             },
//             {
//                 $addToSet: { participants: uid }
//             }
//         );

//         if (result.matchedCount === 0)
//         {
//             console.log(result);
//             return res.status(400).json('Event not found, already registered, or event is full');
//         }

//         console.log('registered by ' + uid);

//         return res.status(200).json('Event registered successfully');
//     }
//     catch(err)
//     {
//         console.log('::Error registering for event:', err.message);
//         res.status(500).json('something went wrong');
//     }

// });


router.get('/myPosts', jwtAuth, async(req, res) => {

    try
    {
        const uid = req.user.id;
        const posts = await discussionPostModel.find({author: uid});

        if(!posts)
        {
            return res.status(404).json({msg: 'No posts found.'});
        }
        
        res.status(200).json(posts);

    }
    catch(err)
    {
        console.log('Error reading posts: ', err);
        res.status(500).json({msg: 'something went wrong'});
    }
});


router.delete('/deletePost/:postID', jwtAuth, async (req, res) => {

    try
    {
        const postID = req.params.postID;
        const uid = req.user.id;

        const result = await discussionPostModel.findOneAndDelete({ _id: postID, author: uid });

        if(!result)
        {
            return res.status(404).json({msg: 'Post not found.'});
        }

        console.log('post deleted successfully');
    
        return res.status(200).json('Post deleted successfully');
    }
    catch(err)
    {
        console.log('Error deleting post: ', err.message);
        res.status(500).json({msg: 'something went wrong'});
    }
});

module.exports = router;