import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '@microarch-ticketing/common';
import jwt from 'jsonwebtoken';
const router = express.Router();

interface UserPayload {
    id: string;
    email: string;
};

// To add currentUser to req, we have to reach the base class of Request and add a property.
declare global {
    namespace Express {
        interface Request {
            currentUser ?: UserPayload;
        }
    }
}


function currentUser(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.session?.jwt) {
            return next();
        }

        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
        next();
    } catch(err) {
        console.log(err);
    }
}

router.get("/api/users/currentUser", currentUser, requireAuth, (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
