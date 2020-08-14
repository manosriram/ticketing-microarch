import express from 'express';
import { requireAuth } from '@microarch-ticketing/common';
const router = express.Router();

router.post("/api/tickets/", requireAuth, async (req, res) => {
    res.send({});
});

export { router as createTicket };
