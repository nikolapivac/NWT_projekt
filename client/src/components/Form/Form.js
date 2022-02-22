import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
 
//currentId and setCurrentId were sent as props from App component
const Form = ({ currentId, setCurrentId }) => {
    //creating the state (initializing its properties)
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''});
    // mapping through the posts and finding only the post that we need
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    //using useEffect to populate the values of the form with exisiting values (when we want to update the post)
    //when [] is changed, {} is called
    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //if we have an id, that means we have to update a post, not create one
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        else{
            //if we don't have and id, we dispatch the action for creating a new post
            dispatch(createPost({...postData, name: user?.result?.name}));   
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own posts and like other's posts.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Post'}</Typography>
        
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Post</Button>
                <Button className={classes.buttonClear} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper> 
    )
}

export default Form;