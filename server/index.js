// the starting point off the server application
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

// intializing the app
const app = express();

// every route inside postRoutes is going to start with /posts
app.use('/posts', postRoutes);

// setting up the body parser so we can properly send requests
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//connecting the server to the database 
const CONNECTION_URL = 'mongodb+srv://nikolapivac:nikolapivac123@cluster0.orgti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// [not necessary] mongoose.set('useFindAndModify', false);
