import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

// Mongoose Handler
const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listening on 3000");
    });
};

start();
