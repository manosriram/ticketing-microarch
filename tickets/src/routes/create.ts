import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@microarch-ticketing/common';
import { body } from 'express-validator';
const router = express.Router();
import { Ticket } from '../../models/ticket';

router.post("/api/tickets/", requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    res.status(201).send(ticket);
});

export { router as createTicket };
