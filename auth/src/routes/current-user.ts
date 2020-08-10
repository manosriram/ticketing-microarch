import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
const router = express.Router();

router.get("/api/users/currentUser", currentUser, requireAuth, (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
