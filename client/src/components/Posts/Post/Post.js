import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';
import { faHeart, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    
//post is sent as a prop from parent component Posts
const Post = ({ post }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={() => {}}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="sm" color="primary" onClick={() => {}}>
                    <FontAwesomeIcon icon={faHeart} />
                    {post.likeCount} people like this
                </Button>
                <Button size="sm" color="primary" onClick={() => {}}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;