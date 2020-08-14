import mongoose from 'mongoose';
import { app } from './app';

// Mongoose Handler
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.TICKETS_MONGO_URI) {
        throw new Error("Tickets Mongo Uri must be defined.");
    }
    try {
        await mongoose.connect(process.env.TICKETS_MONGO_URI, {
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
