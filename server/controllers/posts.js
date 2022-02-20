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

    const newPost = new PostMessage(post);
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