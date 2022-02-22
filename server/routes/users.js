import express from 'express';
import { signin, signup } from '../controllers/user.js'

const router = express.Router();

//ADDING ROUTES
//we need to define the path and call the controller
router.post('/signin', signin);
router.post('/signup', signup);

export default router;