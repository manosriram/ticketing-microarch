export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database';
    constructor() {
        super();

        // Just because 'Error' is a built-in class.
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
};
