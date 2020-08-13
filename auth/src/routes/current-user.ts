import express from 'express';
import { currentUser } from '@microarch-ticketing/common';
import { requireAuth } from '@microarch-ticketing/common';
const router = express.Router();

router.get("/api/users/currentUser", currentUser, requireAuth, (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
