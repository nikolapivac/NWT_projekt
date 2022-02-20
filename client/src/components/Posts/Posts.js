import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'

import useStyles from './styles'
    

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    return (
        // if there is no posts, show CircularProgress; if there are some posts, show them
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;