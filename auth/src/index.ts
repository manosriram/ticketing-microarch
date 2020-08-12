import mongoose from 'mongoose';
import { app } from './app';

// Mongoose Handler
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
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

    const PORT: number = 3000;
    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
};

start();
