import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        // added "await" because finding messages takes time
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    //setting the creator to the one with the speicific id
    const newPost = new PostMessage({...post, creator:req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // the id is defined in the route; here we are renaming it to _id
    const { id: _id } = req.params;

    const post = req.body;

    //checking if the id is valid
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID.');

    //if the id is valid, updating new post and returning it as a response
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID.');

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated!" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID.');

    const post = await PostMessage.findById(id);

    //checking if the user's id is already among the likes
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        //the user didn't like the post before, so he likes the post now
        post.likes.push(req.userId);
    } else {
        //the user already liked the post before, so he dislikes the post now
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}