import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import session from 'express-session';

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from '@microarch-ticketing/common';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(session({
    secret: '12351234',
    resave: false,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 30 * 86400 * 1000)
}));

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
