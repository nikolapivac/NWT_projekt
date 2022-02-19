import mongoose from 'mongoose';

// creating a mongoose schema (specifying what each post will have)
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

//turning the schema into a model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;