import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string []>;
        }
    }
}

let mongo: any;
// Run before all tests, start the mongo-in-memory-server.
beforeAll(async () => {
    process.env.JWT_KEY = '123123';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Before Each Test, clean the DB.
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Close the connection after finishing all tests.
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signup = async () => {
    // Build a JWT Payload. { id, email }

    // Create the JWT!
};
