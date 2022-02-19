import express from 'express';

const router = express.Router();

//adding routes
router.get('/', (req, res) => {
    res.send("This works!");
});

export default router;